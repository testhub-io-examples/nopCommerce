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

    //'Fixed Rate/By country' switch steps
    tour.addStep({
      title: LocalResourcesProvider.localized_data.TaxManualSwitchTitle,
      text: LocalResourcesProvider.localized_data.TaxManualSwitchText,
      canClickTarget: false,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [nextButton]
    });

    tour.addStep({
      title: LocalResourcesProvider.localized_data.TaxManualFixedTitle,
      text: LocalResourcesProvider.localized_data.TaxManualFixedText,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    tour.addStep({
      title: LocalResourcesProvider.localized_data.TaxManualByCountryTitle,
      text: LocalResourcesProvider.localized_data.TaxManualByCountryText,
      attachTo: {
        element: '.onoffswitch',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    //'Tax categories' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.TaxManualCategoriesTitle,
      text: LocalResourcesProvider.localized_data.TaxManualCategoriesText,
      attachTo: {
        element: '#tax-categories-grid_wrapper',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    //'Edit rate' step
    var firstEditButtonId = "buttonEdit_tax_categories_grid1";

    if ($('#' + firstEditButtonId).length) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.TaxManualEditTitle,
        text: LocalResourcesProvider.localized_data.TaxManualEditText,
        attachTo: {
          element: '#' + firstEditButtonId,
          on: 'bottom'
        },
        canClickTarget: false,
        buttons: [backButton, doneButton]
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