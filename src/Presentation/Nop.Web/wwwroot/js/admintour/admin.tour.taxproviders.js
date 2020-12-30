$(document).ready(function () {
  $('#tax-providers-grid').on('draw.dt', function () {
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

    var manualMethodRowId = 'row_taxfixedorbycountrystatezip';
    var avalaraMethodRowId = 'row_taxavalara';

    var manualMethodExists = $('#' + manualMethodRowId).length;
    var avalaraMethodExists = $('#' + avalaraMethodRowId).length;

    //'Tax providers' step
    var taxProvidersStepButtons = [];
    if (!manualMethodExists && !avalaraMethodExists) {
      taxProvidersStepButtons = [doneButton]
    } else {
      taxProvidersStepButtons = [nextButton]
    }

    tour.addStep({
      title: LocalResourcesProvider.localized_data.TaxProvidersTaxProvidersTitle,
      text: LocalResourcesProvider.localized_data.TaxProvidersTaxProvidersText,
      attachTo: {
        element: '#tax-providers-area',
        on: 'bottom'
      },
      buttons: taxProvidersStepButtons
    });

    //'Avalara tax provider' step
    if (avalaraMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.TaxProvidersAvalaraTitle,
        text: LocalResourcesProvider.localized_data.TaxProvidersAvalaraText,
        attachTo: {
          element: '#' + avalaraMethodRowId,
          on: 'bottom'
        },
        buttons: [backButton, nextButton]
      });
    }

    //'Manual tax provider' step
    if (manualMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.TaxProvidersManualTitle,
        text: LocalResourcesProvider.localized_data.TaxProvidersManualText,
        attachTo: {
          element: '#' + manualMethodRowId,
          on: 'bottom'
        },
        buttons: [backButton, nextButton]
      });
    }

    //'Mark as a primary provider' step
    if (manualMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.TaxProvidersPrimaryProviderTitle,
        text: LocalResourcesProvider.localized_data.TaxProvidersPrimaryProviderText,
        attachTo: {
          element: '#' + manualMethodRowId + ' .column-primary .btn',
          on: 'bottom'
        },
        buttons: [backButton, nextButton]
      });
    }

    //Redirect to Manual
    if (manualMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.TaxProvidersConfigureTitle,
        text: LocalResourcesProvider.localized_data.TaxProvidersConfigureText,
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