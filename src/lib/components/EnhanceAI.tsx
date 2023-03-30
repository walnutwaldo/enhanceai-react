import React, { useEffect, useState } from "react";

export default function EnhanceAI(props: {
  children: any;
  context?: string;
  defaultSuggestion?: string;
  delay?: number;
}) {
  let { children, context, defaultSuggestion, delay } = props;

  const [enabled, setEnabled] = useState(false);

  function activateScript() {
    const source = "https://enhanceai.dev/library/enhanceai-v0.1.0.min.js";

    // If there is already a script with id 'enhanceai-script', don't add another one
    if (document.getElementById("enhanceai-script")) {
      return;
    } else {
      const script = document.createElement("script");
      script.id = "enhanceai-script";
      script.src = source;
      script.type = "text/javascript";
      document.head.appendChild(script);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
      activateScript();
    }, 1000);
  }, []);

  if (enabled) {
    children = React.Children.map(children, (child) => {
      let props: any = {};
      const className = (child.props.className || "") + " enhanceai";
      props = {
        className,
      };
      if (context) {
        props["data-aicontext"] = context;
      }
      if (defaultSuggestion) {
        props["data-aidefaultsuggestion"] = defaultSuggestion;
      }
      if (delay) {
        props["data-aidelay"] = Math.max(100, delay);
        if (delay < 100) {
          console.error(
            `EnhanceAI: The delay provided: ${delay} is below the minimum of 100ms. It has automatically been increased to 100ms.`
          );
        }
      }

      return React.cloneElement(child, props);
    });
  }

  return <>{children}</>;
}
