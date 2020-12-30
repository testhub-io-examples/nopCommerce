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
      title: 'Fixed rate/By weight switch',
      text: 'The <b>Fixed rate/By weight switch</b> allows you to choose the type of shipping rates you\'d like to use in your store <br> <i>*We set this switch to the "Fixed rate" value and disabled for the guide purposes</i>',
      canClickTarget: false,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [nextButton]
    });

    tour.addStep({
      title: '"Fixed rate" option',
      text: 'The <b>fixed shipping rate</b> option allows you to set shipping cost depending on the shipping method',
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    tour.addStep({
      title: '"By weight" option',
      text: 'The <b>shipping by weight and by total</b> option allows setting different shipping fees based on shipment weight and total',
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });


    //'Shipping methods' step
    tour.addStep({
      title: 'Shipping methods',
      text: 'This table contains shipping methods used by offline shipping providers. There are a few shipping methods created automatically during the installation process',
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
        title: 'Edit rate',
        text: 'Click the <b>Edit</b> button to edit a rate for the certain shipping method',
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
      title: 'Manage shipping methods',
      text: 'Using the <b>Manage shipping methods</b> button you can add new shipping methods or delete the existing ones',
      attachTo: {
        element: '#manage-shipping-methods-button',
        on: 'bottom'
      },
      buttons: [backButton, doneButton]
    });

    tour.start();
  });
})