$(document).ready(function () {
  $('#shippingproviders-grid').on('draw.dt', function () {
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

    var manualMethodRowId = 'row_shippingfixedbyweightbytotal';
    var shipStationMethodRowId = 'row_shippingshipstation';

    var manualMethodExists = $('#' + manualMethodRowId).length;
    var shipStationMethodExists = $('#' + shipStationMethodRowId).length;

    //'Set up shipping' step
    var shippingMethodStepButtons = [];
    if (!manualMethodExists && !shipStationMethodExists) {
      shippingMethodStepButtons = [
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
      shippingMethodStepButtons = [
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
      title: 'Shipping methods',
      text: 'On this page you can see all the shipping providers (plugins) which allowed to use in your store. But you can always find much more in our <a href="https://www.nopcommerce.com/extensions?category=shipping-delivery" target="_blank">marketplace</a>',
      attachTo: {
        element: '#shipping-methods-area',
        on: 'bottom'
      },
      buttons: shippingMethodStepButtons
    });

    //'Manual shipping provider' step
    if (manualMethodExists) {
      tour.addStep({
        title: 'Manual shipping provider',
        text: 'By default, the only active shipping plugin is the <b>Manual</b>. This provider allows you to configure shipping methods and rates manually',
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

    //'ShipStation shipping provider' step
    if (shipStationMethodExists) {
      var shipStationStepButtons = [{
        action() {
          return tour.back();
        },
        classes: 'button-back',
        text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
      }];
      if (manualMethodExists) {
        shipStationStepButtons.push({
          action() {
            return tour.next();
          },
          classes: 'button-next',
          text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
        });
      } else {
        shipStationStepButtons.push({
          action() {
            return tour.cancel();
          },
          classes: 'button-done',
          text: 'Done',
          secondary: true
        });
      }

      tour.addStep({
        title: 'ShipStation',
        text: 'If you want to provide more accurate shipping rates, we recommend you to use shipping services such as <b>ShipStation</b>. Read how to configure it in <a href="https://docs.nopcommerce.com/getting-started/configure-shipping/shipping-providers/shipstation.html" target="_blank">this article</a>',
        attachTo: {
          element: '#' + shipStationMethodRowId,
          on: 'bottom'
        },
        buttons: shipStationStepButtons,
      });
    }

    //Redirect to Manual
    if (manualMethodExists) {
      tour.addStep({
        title: 'Configure Manual',
        text: 'Now we\'ll configure the <b>Manual</b> shipping provider. Click this button to proceed to the plugin configuration page',
        attachTo: {
          element: '#' + manualMethodRowId + ' .column-configure .btn-default',
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
    }

    tour.start();
  });
})