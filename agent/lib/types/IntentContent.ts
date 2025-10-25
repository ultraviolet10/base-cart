import {
  type ContentCodec,
  ContentTypeId,
  type EncodedContent,
} from "@xmtp/content-type-primitives";

/**
 * Content Type ID for Intent messages
 * Following XIP-67 specification for inline actions
 */
export const ContentTypeIntent = new ContentTypeId({
  authorityId: "coinbase.com",
  typeId: "intent",
  versionMajor: 1,
  versionMinor: 0,
});

/**
 * Intent content structure
 * Users express their selection by sending Intent messages when they tap action buttons
 */
export type IntentContent = {
  /** References Actions.id - provides strong coupling with Actions message */
  id: string;
  /** References specific Action.id - indicates which action was selected */
  actionId: string;
  /** Optional context data for the selection */
  metadata?: Record<string, string | number | boolean | null>;
};

/**
 * Intent codec for encoding/decoding Intent messages
 * Implements XMTP ContentCodec interface for Intent content type
 */
export class IntentCodec implements ContentCodec<IntentContent> {
  get contentType(): ContentTypeId {
    return ContentTypeIntent;
  }

  encode(content: IntentContent): EncodedContent {
    // Validate content before encoding
    this.validateContent(content);

    return {
      type: ContentTypeIntent,
      parameters: { encoding: "UTF-8" },
      content: new globalThis.TextEncoder().encode(JSON.stringify(content)),
    };
  }

  decode(content: EncodedContent): IntentContent {
    const encoding = content.parameters.encoding;
    if (encoding && encoding !== "UTF-8") {
      throw new Error(`unrecognized encoding ${encoding}`);
    }

    const decodedContent = new globalThis.TextDecoder().decode(content.content);
    try {
      const parsed = JSON.parse(decodedContent) as IntentContent;
      this.validateContent(parsed);
      return parsed;
    } catch (error) {
      throw new Error(`Failed to decode Intent content: ${error}`);
    }
  }

  fallback(content: IntentContent): string {
    return `User selected action: ${content.actionId}`;
  }

  shouldPush(): boolean {
    return true;
  }

  /**
   * Validates Intent content according to specification
   */
  private validateContent(content: IntentContent): void {
    if (!content.id || typeof content.id !== "string") {
      throw new Error("Intent.id is required and must be a string");
    }

    if (!content.actionId || typeof content.actionId !== "string") {
      throw new Error("Intent.actionId is required and must be a string");
    }

    // Validate metadata if provided
    if (content.metadata !== undefined) {
      if (
        typeof content.metadata !== "object" ||
        content.metadata === null ||
        Array.isArray(content.metadata)
      ) {
        throw new Error("Intent.metadata must be an object if provided");
      }

      // Check for reasonable metadata size to avoid XMTP content limits
      const metadataString = JSON.stringify(content.metadata);
      if (metadataString.length > 10000) {
        // 10KB limit for metadata
        throw new Error("Intent.metadata is too large (exceeds 10KB limit)");
      }
    }
  }
}
