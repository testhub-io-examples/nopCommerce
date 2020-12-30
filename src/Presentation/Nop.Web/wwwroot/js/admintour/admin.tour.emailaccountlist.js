$(document).ready(function () {
  $('#email-accounts-grid').on('draw.dt', function () {
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

    //'Email accounts' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.EmailAccountListEmailAccounts1Title,
      text: LocalResourcesProvider.localized_data.EmailAccountListEmailAccounts1Text,
      attachTo: {
        element: '#email-accounts-area',
        on: 'bottom'
      },
      buttons: [nextButton]
    });


    //'Email accounts' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.EmailAccountListEmailAccounts2Title,
      text: LocalResourcesProvider.localized_data.EmailAccountListEmailAccounts2Text,
      attachTo: {
        element: '#email-accounts-area',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    var defaultEmailAccountRowId = 'row_testmailcom';

    //'Default email account' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.EmailAccountListDefaultEmailAccountTitle,
      text: LocalResourcesProvider.localized_data.EmailAccountListDefaultEmailAccountText,
      attachTo: {
        element: '#' + defaultEmailAccountRowId + ' .column-default .btn',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    //'Edit an email account' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.EmailAccountListEditTitle,
      text: LocalResourcesProvider.localized_data.EmailAccountListEditText,
      attachTo: {
        element: '#' + defaultEmailAccountRowId + ' .column-edit .btn',
        on: 'bottom'
      },
      buttons: [backButton, doneButton]
    });

    tour.start();
  });
})