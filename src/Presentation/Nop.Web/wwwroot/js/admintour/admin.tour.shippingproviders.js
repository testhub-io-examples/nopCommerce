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

    var nextButton = {
      action() {
        return tour.next();
      },
      classes: 'button-next',
      text: LocalResourcesProvider.localized_data.Next + ' &nbsp; <i class="fa fa-arrow-right"></i>'
    };

    var backButton = {
      action() {
        return tour.back();
      },
      classes: 'button-back',
      text: '<i class="fa fa-arrow-left"></i> &nbsp; ' + LocalResourcesProvider.localized_data.Back
    };

    var doneButton = {
      action() {
        return tour.cancel();
      },
      classes: 'button-done',
      text: LocalResourcesProvider.localized_data.Done,
      secondary: true
    };

    var manualMethodRowId = 'row_shippingfixedbyweightbytotal';
    var shipStationMethodRowId = 'row_shippingshipstation';

    var manualMethodExists = $('#' + manualMethodRowId).length;
    var shipStationMethodExists = $('#' + shipStationMethodRowId).length;

    //'Set up shipping' step
    var shippingMethodStepButtons = [];
    if (!manualMethodExists && !shipStationMethodExists) {
      shippingMethodStepButtons = [doneButton]
    } else {
      shippingMethodStepButtons = [nextButton]
    }

    tour.addStep({
      title: LocalResourcesProvider.localized_data.ShippingProvidersProvidersTitle,
      text: LocalResourcesProvider.localized_data.ShippingProvidersProvidersText,
      attachTo: {
        element: '#shipping-methods-area',
        on: 'bottom'
      },
      buttons: shippingMethodStepButtons
    });

    //'Manual shipping provider' step
    if (manualMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.ShippingProvidersManualTitle,
        text: LocalResourcesProvider.localized_data.ShippingProvidersManualText,
        attachTo: {
          element: '#' + manualMethodRowId,
          on: 'bottom'
        },
        buttons: [backButton, nextButton]
      });
    }

    //'ShipStation shipping provider' step
    if (shipStationMethodExists) {
      var shipStationStepButtons = [backButton];
      if (manualMethodExists) {
        shipStationStepButtons.push(nextButton);
      } else {
        shipStationStepButtons.push(doneButton);
      }

      tour.addStep({
        title: LocalResourcesProvider.localized_data.ShippingProvidersShipStationTitle,
        text: LocalResourcesProvider.localized_data.ShippingProvidersShipStationText,
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
        title: LocalResourcesProvider.localized_data.ShippingProvidersConfigureTitle,
        text: LocalResourcesProvider.localized_data.ShippingProvidersConfigureText,
        attachTo: {
          element: '#' + manualMethodRowId + ' .column-configure .btn-default',
          on: 'bottom'
        },
        buttons: [backButton, doneButton]
      });
    }

    tour.start();
  });
})