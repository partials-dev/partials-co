import Preact, { h } from 'preact' /** @jsx h */

const componentConfig = {
  id: [10933796810],
  node: document.getElementById('product-component-aaf208b46bb'),
  moneyFormat: '%24%7B%7Bamount%7D%7D',
  options: {
    product: {
      buttonDestination: 'checkout',
      variantId: 'all',
      contents: {
        imgWithCarousel: false,
        variantTitle: false,
        description: false,
        buttonWithQuantity: false,
        quantity: false
      },
      text: {
        button: 'BUY NOW'
      },
      styles: {
        product: {
          '@media (min-width: 601px)': {
            'max-width': '100%',
            'margin-left': '0',
            'margin-bottom': '50px'
          }
        },
        button: {
          'background-color': '#a7a7a7',
          ':hover': {
            'background-color': '#969696'
          },
          ':focus': {
            'background-color': '#969696'
          }
        },
        compareAt: {
          'font-size': '12px'
        }
      }
    },
    cart: {
      contents: {
        button: true
      },
      styles: {
        button: {
          'background-color': '#a7a7a7',
          ':hover': {
            'background-color': '#969696'
          },
          ':focus': {
            'background-color': '#969696'
          }
        },
        footer: {
          'background-color': '#ffffff'
        }
      }
    },
    modalProduct: {
      contents: {
        img: false,
        imgWithCarousel: true,
        variantTitle: false,
        buttonWithQuantity: true,
        button: false,
        quantity: false
      },
      styles: {
        product: {
          '@media (min-width: 601px)': {
            'max-width': '100%',
            'margin-left': '0px',
            'margin-bottom': '0px'
          }
        },
        button: {
          'background-color': '#a7a7a7',
          ':hover': {
            'background-color': '#969696'
          },
          ':focus': {
            'background-color': '#969696'
          }
        }
      }
    },
    toggle: {
      styles: {
        toggle: {
          'background-color': '#a7a7a7',
          ':hover': {
            'background-color': '#969696'
          },
          ':focus': {
            'background-color': '#969696'
          }
        }
      }
    },
    productSet: {
      styles: {
        products: {
          '@media (min-width: 601px)': {
            'margin-left': '-20px'
          }
        }
      }
    }
  }
}

export default class BuyShirtButton extends Preact.Component {
  componentDidMount() {
    var scriptURL =
      'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js'
    if (window.ShopifyBuy) {
      if (window.ShopifyBuy.UI) {
        ShopifyBuyInit()
      } else {
        loadScript()
      }
    } else {
      loadScript()
    }

    function loadScript() {
      var script = document.createElement('script')
      script.async = true
      script.src = scriptURL
      ;(document.getElementsByTagName('head')[0] ||
        document.getElementsByTagName('body')[0])
        .appendChild(script)
      script.onload = ShopifyBuyInit
    }

    function ShopifyBuyInit() {
      var client = window.ShopifyBuy.buildClient({
        domain: 'partials.myshopify.com',
        apiKey: 'ac5bba6f267258905c098179cb1f28d3',
        appId: '6'
      })

      window.ShopifyBuy.UI.onReady(client).then(function(ui) {
        ui.createComponent('product', componentConfig)
      })
    }
  }
  render() {
    return <div id="product-component-aaf208b46bb" />
  }
}
