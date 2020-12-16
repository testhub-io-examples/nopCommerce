$(document).ready(function () {
  $('#tax-categories-grid').on('draw.dt', function () {
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

    //'Fixed Rate/By country' switch steps
    tour.addStep({
      title: 'Fixed rate/By country switch',
      text: 'The <b>Fixed rate/By country switch</b> allows you to choose the type of tax rates you\'d like to use in your store <br> <i>*We set this switch to the "Fixed rate" value and disabled for the guide purposes</i>',
      canClickTarget: false,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [
        {
          action() {
            return tour.next();
          },
          classes: 'button-next',
          text: 'Next &nbsp; <i class="fa fa-arrow-right"></i>'
        }
      ]
    });

    tour.addStep({
      title: '"Fixed rate" option',
      text: 'The <b>fixed tax rate</b> option allows you to set tax rates depending on tax category',
      attachTo: {
        element: '.onoffswitch',
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

    tour.addStep({
      title: '"By country" option',
      text: 'The tax rates <b>by country/state/zip</b> option allow setting different tax rates based on a country, state or zip',
      attachTo: {
        element: '.onoffswitch',
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

    //'Tax categories' step
    tour.addStep({
      title: 'Tax categories',
      text: 'This table contains tax categories used by offline tax providers. There are a few tax categories created automatically during the installation process',
      attachTo: {
        element: '#tax-categories-grid_wrapper',
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

    //'Edit rate' step
    var firstEditButtonId = "buttonEdit_tax_categories_grid1";

    if ($('#' + firstEditButtonId).length) {
      tour.addStep({
        title: 'Edit tax rate',
        text: 'Click the <b>Edit</b> button to edit a tax rate for the certain tax category',
        attachTo: {
          element: '#' + firstEditButtonId,
          on: 'bottom'
        },
        canClickTarget: false,
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

    //TODO: 'Manage tax categories' step
    //tour.addStep({
    //  title: 'Manage tax categories',
    //  text: 'Using the <b>Manage shipping methods</b> button you can add new shipping methods or delete the existing ones',
    //  attachTo: {
    //    element: '#manage-shipping-methods-button',
    //    on: 'bottom'
    //  },
    //  buttons: [
    //    {
    //      action() {
    //        return tour.back();
    //      },
    //      classes: 'button-back',
    //      text: '<i class="fa fa-arrow-left"></i> &nbsp; Back'
    //    },
    //    {
    //      action() {
    //        return tour.cancel();
    //      },
    //      classes: 'button-done',
    //      text: 'Done',
    //      secondary: true
    //    }
    //  ],
    //});

    tour.start();

  });
})