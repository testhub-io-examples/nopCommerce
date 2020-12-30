$(document).ready(function () {
  $('#shipping-rate-grid').on('draw.dt', function () {
    if ($('body').hasClass('advanced-settings-mode')) {
      $('.onoffswitch-checkbox').trigger('click');
    }

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

    //'Fixed Rate/By Weight' switch steps
    tour.addStep({
      title: LocalResourcesProvider.localized_data.ConfigureManualSwitchTitle,
      text: LocalResourcesProvider.localized_data.ConfigureManualSwitchText,
      canClickTarget: false,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [nextButton]
    });

    tour.addStep({
      title: LocalResourcesProvider.localized_data.ConfigureManualFixedRateTitle,
      text: LocalResourcesProvider.localized_data.ConfigureManualFixedRateText,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    tour.addStep({
      title: LocalResourcesProvider.localized_data.ConfigureManualByWeightTitle,
      text: LocalResourcesProvider.localized_data.ConfigureManualByWeightText,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });


    //'Shipping methods' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.ConfigureManualMethodsTitle,
      text: LocalResourcesProvider.localized_data.ConfigureManualMethodsText,
      attachTo: {
        element: '#shipping-rate-grid_wrapper',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    //'Edit rate' step
    var firstEditButtonId = "buttonEdit_shipping_rate_grid1";

    if ($('#' + firstEditButtonId).length) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.ConfigureManualEditTitle,
        text: LocalResourcesProvider.localized_data.ConfigureManualEditText,
        attachTo: {
          element: '#' + firstEditButtonId,
          on: 'bottom'
        },
        canClickTarget: false,
        buttons: [backButton, nextButton]
      });
    }

    //'Manage shipping methods' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.ConfigureManualManageTitle,
      text: LocalResourcesProvider.localized_data.ConfigureManualManageText,
      attachTo: {
        element: '#manage-shipping-methods-button',
        on: 'bottom'
      },
      buttons: [backButton, doneButton]
    });

    tour.start();
  });
})