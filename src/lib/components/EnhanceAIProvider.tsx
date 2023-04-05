import React, { useEffect } from "react";

export default function EnhanceAIProvider(props: {
  children: any;
  apiKey: string;
}) {
  const { children, apiKey } = props;

  function activateScript() {
    if (document) {
      (document as any).enhanceai = {
        ...(document as any).enhanceai,
        apiKey,
      };
    }
  }

  useEffect(() => {
    activateScript();
  }, [apiKey]);

  return <>{children}</>;
}
