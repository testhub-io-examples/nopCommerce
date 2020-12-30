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
      title: 'Tax providers',
      text: 'On this page you can see all the tax providers (plugins) which allowed to use in your store. But you can always find much more in our <a href="https://www.nopcommerce.com/extensions?category=taxes" target="_blank">marketplace</a>',
      attachTo: {
        element: '#tax-providers-area',
        on: 'bottom'
      },
      buttons: taxProvidersStepButtons
    });

    //'Avalara tax provider' step
    if (avalaraMethodExists) {
      tour.addStep({
        title: 'Avalara tax provider',
        text: 'You can automate tax compliance in your store. Set up the <b>Avalara tax provider</b> and you won\'t need to worry about taxes anymore. Avalara is software for automated tax compliance. Read how to configure it in <a href="https://docs.nopcommerce.com/getting-started/configure-taxes/tax-providers/avalara.html" target="_blank">this article</a>',
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
        title: 'Manual tax provider',
        text: '<b>Manual tax provider</b> allows you to set up fixed tax rates depending on country/state/zip',
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
        title: 'Mark as a primary provider',
        text: 'You can mark the desired tax provider as a primary one using the <b>Mark as primary provider</b> button',
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
        title: 'Configure Manual',
        text: 'Now we\'ll configure the <b>Manual</b> tax provider. Click this button to proceed to the plugin configuration page',
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