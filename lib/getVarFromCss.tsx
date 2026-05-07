import { useEffect, useState } from "react";

function GetVarFromCss(variableName: string): string {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    // Get the value from the :root (documentElement)
    const rootStyle = getComputedStyle(document.documentElement);
    const drawerWidth = parseInt(
      rootStyle.getPropertyValue("--mobile-nav-width").trim().replace("px", ""),
      10,
    );
    console.log("Drawer width from CSS variable:", drawerWidth);
    setWidth(drawerWidth);
  }, []);

  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variableName);
  return value.trim();
}
