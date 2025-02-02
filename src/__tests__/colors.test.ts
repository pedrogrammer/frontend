import fs from "fs";
import path from "path";

const componentsFolderPath = path.resolve(__dirname, "../components");

const findAllComponents = (folderPath: string): string[] => {
  const files = fs.readdirSync(folderPath);

  let components: string[] = [];

  for (const file of files) {
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      components = components.concat(findAllComponents(filePath));
    } else if (
      stats.isFile() &&
      (file.endsWith(".tsx") || file.endsWith(".ts"))
    ) {
      components.push(filePath);
    }
  }

  return components;
};

const findColorValues = (componentPath: string): string[] => {
  const componentFile = fs.readFileSync(componentPath, "utf-8");
  const colorRegex =
    /#(?:[0-9a-fA-F]{3}){1,2}|rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(?:,([01](?:\.\d+)?))?\)|\b(black|silver|gray|white|maroon|red|purple|fuchsia|green|lime|olive|yellow|navy|blue|teal|aqua|aliceblue|antiquewhite|aquamarine|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|gold|goldenrod|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|magenta|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|rebeccapurple|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato|transparent|turquoise|violet|wheat|whitesmoke|yellowgreen)\b/g;
  const colorValues = componentFile.match(colorRegex) || [];

  return colorValues;
};

describe("Color Test", () => {
  test("No hard coded color values should be present in any components", () => {
    const components = findAllComponents(componentsFolderPath);

    for (const component of components) {
      const colorValues = findColorValues(component);
      if (colorValues.length > 0) {
        // Providing more detailed info when color values are found
        colorValues.forEach((color) => {
          console.error(`Found color "${color}" in ${component}`);
        });

        // Fail the test with a custom error message
        expect(colorValues).toHaveLength(0); // Ensure no colors found
      }
    }
  });
});
