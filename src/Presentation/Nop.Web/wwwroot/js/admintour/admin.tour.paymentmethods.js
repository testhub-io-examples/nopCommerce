$(document).ready(function () {
  $('#paymentmethods-grid').on('draw.dt', function () {
    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        popperOptions: {
          modifiers: [{
            name: 'offset',
            options: {
              offset: [0, 15],
            },
          }],
        },
        classes: 'admin-area-tour',
        cancelIcon: {
          enabled: true
        },
        modalOverlayOpeningPadding: '3',
        scrollTo: { behavior: 'smooth', block: 'center' },
        when: {
          show() {
            const currentStepElement = tour.currentStep.el;
            const header = currentStepElement.querySelector('.shepherd-header');
            const progress = document.createElement('span');
            progress.className = "shepherd-progress";
            progress.innerText = `${tour.steps.indexOf(tour.currentStep) + 1}/${tour.steps.length}`;
            header.insertBefore(progress, currentStepElement.querySelector('.shepherd-title'));
          }
        }
      }
    });

    var checkMoneyMethodRowId = 'row_paymentscheckmoneyorder';
    var manualMethodRowId = 'row_paymentsmanual';
    var paypalButtonsMethodRowId = 'row_paymentspaypalsmartpaymentbuttons';

    var checkMoneyMethodExists = $('#' + checkMoneyMethodRowId).length;
    var manualMethodExists = $('#' + manualMethodRowId).length;
    var paypalButtonsMethodExists = $('#' + paypalButtonsMethodRowId).length;

    //'Payment methods' step
    var paymentMethodsStepButtons = [];
    if (!checkMoneyMethodExists && !manualMethodExists && paypalButtonsMethodExists) {
      paymentMethodsStepButtons = [
        {
          action() {
            return tour.cancel();
          },
          classes: 'button-done',
          text: 'Done',
          secondary: true
        }
      ]
    } else {
      paymentMethodsStepButtons = [
        {
          action() {
            return tour.next();
          },
          classes: 'button-next',
          text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
        }
      ]
    }

    tour.addStep({
      title: 'Payment methods',
      text: 'On this page you can see all the payment methods (plugins) which allowed to use in your store. But you can always find much more in our <a href="https://www.nopcommerce.com/extensions?category=payment-modules" target="_blank">marketplace</a>',
      attachTo: {
        element: '#payment-methods-area',
        on: 'bottom'
      },
      buttons: paymentMethodsStepButtons
    });

    //'Check/Money Order' step
    if (checkMoneyMethodExists) {
      tour.addStep({
        title: 'Check/money order',
        text: '<b>Check/money orders</b> are often used by government agencies or large businesses. Rather than paying directly through your site, shoppers will request that you send them a Purchase order (PO), and they will send the payment back. Most of the order processing is handled outside of the software. This method is already enabled',
        attachTo: {
          element: '#' + checkMoneyMethodRowId,
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return tour.back();
            },
            classes: 'button-back',
            text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
          },
          {
            action() {
              return tour.next();
            },
            classes: 'button-next',
            text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
          }
        ]
      });
    }

    //'Manual' step
    if (manualMethodExists) {
      tour.addStep({
        title: 'Credit card (manual)',
        text: 'This is a special payment plugin that allows all orders to be successfully entered on the website, but it does NOT really charge a customer or make any calls to any live payment gateway. It is recommended to use this payment method if you want to perform one of the following: <ul><li>Process all orders offline</li><li>Process them manually via another back-office system</li><li>Test the site end-to-end before going live</li></ul>',
        attachTo: {
          element: '#' + manualMethodRowId,
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return tour.back();
            },
            classes: 'button-back',
            text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
          },
          {
            action() {
              return tour.next();
            },
            classes: 'button-next',
            text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
          }
        ]
      });
    }

    //'PayPal Smart Payment Buttons' step
    if (paypalButtonsMethodExists) {
      tour.addStep({
        title: 'PayPal Smart Payment Buttons',
        text: 'If you want to process payments online we\'d recommend you to set up the <b>PayPal Smart Payment Buttons</b> payment method. PayPal Checkout with Smart Payment Buttons gives your buyers a simplified and secure checkout experience. Read more how to set this plugin <a href="https://docs.nopcommerce.com/getting-started/configure-payments/payment-methods/paypal-smart-payment-buttons.html" target="_blank">here</a>',
        attachTo: {
          element: '#' + paypalButtonsMethodRowId,
          on: 'bottom'
        },
        buttons: [
          {
            action() {
              return tour.back();
            },
            classes: 'button-back',
            text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
          },
          {
            action() {
              return tour.next();
            },
            classes: 'button-next',
            text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
          }
        ],
      });
    }

    //'Configure a payment method' step
    tour.addStep({
      title: 'Configure a payment method',
      text: 'You can configure each payment method by clicking the appropriate <b>Configure</b> button',
      attachTo: {
        element: '#' + paypalButtonsMethodRowId + ' .column-configure .btn-default',
        on: 'bottom'
      },
      buttons: [
        {
          action() {
            return tour.back();
          },
          classes: 'button-back',
          text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
        },
        {
          action() {
            return tour.cancel();
          },
          classes: 'button-done',
          text: 'Done',
          secondary: true
        }
      ],
    });

    tour.start();
  });
})