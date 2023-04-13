export function getSunglassCategoryMesurementDetails(
  attributes,
  measurementsTitle
) {
  let sunglassMeasurementProperties = new Set(measurementsTitle);
  const tmpLensMeasurementMap = new Map();

  attributes.forEach((attribute) => {
    if (attribute.values[0]) {
      if (attribute.attribute.name && attribute.values[0].name) {
        if (sunglassMeasurementProperties.has(attribute.attribute.name)) {
          tmpLensMeasurementMap.set(
            attribute.attribute.name,
            attribute.values[0].name
          );
        }
      }
    }
  });
  const sunglassMeasurementMap = new Map();
  sunglassMeasurementProperties.forEach((sunglassMeasurementProperty) => {
    sunglassMeasurementMap.set(
      sunglassMeasurementProperty,
      tmpLensMeasurementMap.get(sunglassMeasurementProperty)
    );
  });

  if (sunglassMeasurementMap.values()) {
    return Array.from(sunglassMeasurementMap.values());
  }
  return null;
}

export function getProductDetails(attributes) {
  const pdpNameMapping = new Map();
  pdpNameMapping.set("Frame Material", "Material");
  pdpNameMapping.set("Product Code", "Product");

  let ignorePdpAttributes = new Set([
    "Bridge Width",
    "Features",
    "Frame Width",
    "Lens Width",
    "Temple Width",
    "Fit",
  ]);

  let productAttributes = {};
  let pdpDetails = {};

  attributes.forEach((attribute) => {
    if (attribute.values[0]) {
      if (attribute.attribute.name && attribute.values[0].name) {
        let fieldName = "";
        if (pdpNameMapping.has(attribute.attribute.name)) {
          fieldName = pdpNameMapping.get(attribute.attribute.name);
        } else {
          fieldName = attribute.attribute.name;
        }
        if (!ignorePdpAttributes.has(attribute.attribute.name)) {
          productAttributes[fieldName] = attribute.values[0].name;
        }
      }
    }
  });
  return Object.entries(productAttributes);
}

export function getProductFeatures(attributes) {
  let productFeatures = [];
  attributes.forEach((attribute) => {
    if (attribute.values[0]) {
      if (attribute.attribute.name === "Features") {
        if (
          attribute?.values &&
          attribute?.values[0] &&
          attribute?.values[0]?.richText
        ) {
          let data = JSON.parse(attribute?.values[0]?.richText);
          productFeatures = data.blocks[0].data?.items;
        }
      }
    }
  });

  return productFeatures;
}
