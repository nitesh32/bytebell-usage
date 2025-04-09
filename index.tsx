import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/input";
import { useToast } from "@/hooks/use-toast";
import { AppSettings } from "@/api/settings/types";
import MarkdownRenderer from "@/components/common/MarkdownRendrer";
import { TbCopy as CopyIcon } from "react-icons/tb";

interface APIKeysTabProps {
  settings: AppSettings | undefined;
}

interface CodeHighlightProps {
  children: ReactNode;
}

const InlineCode: React.FC<CodeHighlightProps> = ({ children }) => {
  return (
    <code className="bg-[#f4f4f4] dark:bg-[#2f2f2f] whitespace-pre-wrap rounded-md px-1.5 py-0.5 text-sm font-mono ">
      {children}
    </code>
  );
};

const APIKeysTab: React.FC<APIKeysTabProps> = ({ settings }) => {
  const { toast } = useToast();

  const handleCopyAppId = () => {
    if (settings?.app_id) {
      navigator.clipboard.writeText(settings.app_id);
      toast({
        description: "App ID copied to clipboard",
      });
    }
  };

  // Code examples
  const basicIntegrationCode = `\`\`\`html
<!-- Somewhere in <head> -->
<script src="https://bb-chat-widget.s3.us-east-1.amazonaws.com/assets/index.js" async></script>
<link href="https://bb-chat-widget.s3.us-east-1.amazonaws.com/assets/style.css" rel="stylesheet"/>

<!-- Somewhere in <body> -->
<div id="bytebellai" data-app-id=${settings?.app_id || "app_id"}></div>
\`\`\``;

  const positionExample = `\`\`\`html
<div id="bytebellai" 
  data-app-id="your_app_id"
  data-position="bottom-left">
</div>
\`\`\``;

  const colorExample = `\`\`\`html
<div id="bytebellai" 
  data-app-id="your_app_id"
  data-bg-color="#4CAF50"
  data-text-color="#FFFFFF">
</div>
\`\`\``;

  const sizeExample = `\`\`\`html
<div id="bytebellai" 
  data-app-id="your_app_id"
  data-padding="12px 20px"
  data-logo-size="20px">
</div>
\`\`\``;

  const customPositionExample = `\`\`\`html
<div id="bytebellai" 
  data-app-id="your_app_id"
  data-top="50px"
  data-right="50px">
</div>
\`\`\``;

  const fullCustomExample = `\`\`\`html
<div id="bytebellai" 
  data-app-id="your_app_id"
  data-bg-color="#2196F3"
  data-text-color="#FFFFFF"
  data-padding="10px 16px"
  data-logo-size="18px"
  data-bottom="20px"
  data-right="20px">
</div>
\`\`\``;

  return (
    <div className="space-y-8">
      {/* App ID Section */}
      <div>
        <h3 className="mb-1 font-medium">App ID</h3>
        <p className="mb-3 text-sm text-muted-foreground">
          The App ID uniquely identifies your application and links it to your agent widget service.
        </p>
        <div className="flex">
          <Input
            value={settings?.app_id || ""}
            readOnly
            className="font-mono text-sm rounded-r-none"
          />
          <Button variant="outline" className="border-l-0 rounded-l-none" onClick={handleCopyAppId}>
            <CopyIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Installation Section */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Installation</h2>
        <div className="p-4 border rounded-md">
          <h3 className="mb-2 text-base font-medium">Basic integration</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Include the script and stylesheet in your HTML's <InlineCode>&lt;head /&gt;</InlineCode>{" "}
            section, then add the widget container inside the{" "}
            <InlineCode>&lt;body /&gt;</InlineCode>.
          </p>
          <MarkdownRenderer content={basicIntegrationCode} />
        </div>
      </div>

      {/* Customization Section */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Customization</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          The widget can be customized using data attributes on the container element.
        </p>

        {/* Position Customization */}
        <div className="p-4 mb-6 border rounded-md">
          <h3 className="mb-1 text-base font-medium">Predefined Positions</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Position your widget in one of four corners using the{" "}
            <InlineCode>data-position</InlineCode> attribute.
          </p>

          <div className="mb-2">
            <InlineCode>
              data-position="top-left | top-right | bottom-left | bottom-right"
            </InlineCode>
          </div>

          <MarkdownRenderer content={positionExample} />

          <p className="mt-2 text-xs text-muted-foreground">Default: bottom-right</p>
        </div>

        {/* Color Customization */}
        <div className="p-4 mb-6 border rounded-md">
          <h3 className="mb-1 text-base font-medium">Colors</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            Customize the button colors with these attributes:
          </p>

          <div className="mb-3 space-y-2">
            <div>
              <InlineCode>data-bg-color="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">
                Button background color (any valid CSS color)
              </p>
            </div>
            <div>
              <InlineCode>data-text-color="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">
                Button text color (any valid CSS color)
              </p>
            </div>
          </div>

          <MarkdownRenderer content={colorExample} />
        </div>

        {/* Size Customization */}
        <div className="p-4 mb-6 border rounded-md">
          <h3 className="mb-1 text-base font-medium">Size and Padding</h3>
          <p className="mb-3 text-sm text-muted-foreground">Adjust the button dimensions:</p>

          <div className="mb-3 space-y-2">
            <div>
              <InlineCode>data-padding="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">
                Button padding (e.g., "10px", "8px 16px")
              </p>
            </div>
            <div>
              <InlineCode>data-logo-size="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">
                Size of the logo (e.g., "16px", "1.2rem")
              </p>
            </div>
          </div>

          <MarkdownRenderer content={sizeExample} />
        </div>

        {/* Custom Positioning */}
        <div className="p-4 mb-6 border rounded-md">
          <h3 className="mb-1 text-base font-medium">Custom Positioning</h3>
          <p className="mb-3 text-sm text-muted-foreground">
            For precise control, set exact distances from any edge:
          </p>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <InlineCode>data-top="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">Distance from top</p>
            </div>
            <div>
              <InlineCode>data-right="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">Distance from right</p>
            </div>
            <div>
              <InlineCode>data-bottom="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">Distance from bottom</p>
            </div>
            <div>
              <InlineCode>data-left="..."</InlineCode>
              <p className="mt-1 ml-1 text-xs text-muted-foreground">Distance from left</p>
            </div>
          </div>

          <MarkdownRenderer content={customPositionExample} />

          <div className="p-3 mt-3 border rounded-md bg-amber-50 border-amber-200">
            <p className="text-xs text-amber-800">
              <strong>Note:</strong> Custom position values take precedence over the data-position
              attribute. You can specify any combination of top/bottom and left/right.
            </p>
          </div>
        </div>
      </div>

      {/* Complete Example */}
      <div>
        <h2 className="mb-2 text-xl font-semibold">Complete Example</h2>
        <p className="mb-3 text-sm text-muted-foreground">Here's a fully customized widget:</p>
        <div className="p-4 border rounded-md ">
          <MarkdownRenderer content={fullCustomExample} />
        </div>
      </div>
    </div>
  );
};

export default APIKeysTab;
