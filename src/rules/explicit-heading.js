const {isPrimerComponent} = require('../utils/is-primer-component')
const {getJSXOpeningElementName} = require('../utils/get-jsx-opening-element-name')
const {getJSXOpeningElementAttribute} = require('../utils/get-jsx-opening-element-attribute')

const validHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

const isHeadingComponent = elem => getJSXOpeningElementName(elem) === 'Heading'
const isUsingAsProp = elem => {
    const componentAs = getJSXOpeningElementAttribute(elem, 'as');

    if (!componentAs) return;

    return componentAs.value;
}

const isValidAsUsage = value => validHeadings.includes(value.toLowerCase());
const isInvalid = elem => {
    const elemAs = isUsingAsProp(elem);

    if (!elemAs) return 'nonExplicitHeadingLevel'; 
    if(!isValidAsUsage(elemAs.value)) return 'invalidAsValue';

    return false;
}

module.exports = {
    meta: {
        type: "problem",
        schema: [
            {
              properties: {
                skipImportCheck: {
                  type: 'boolean'
                }
              }
            }
          ],
          messages: {
            nonExplicitHeadingLevel: "Heading must have an explicit heading level applied through the `as` prop.",
            invalidAsValue: "Usage of `as` must only be used for heading elements (h1-h6)."
          }
    },
    create: function(context) {
        return {
            JSXOpeningElement(jsxNode) {
                if (isPrimerComponent(jsxNode.name, context.getScope(jsxNode)) && isHeadingComponent(jsxNode)) {
                    const error = isInvalid(jsxNode);

                    if (error) {
                      context.report({
                        node: jsxNode,
                        messageId: error
                      })
                    }
                }
            }
        };
    }
};