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
      title: 'Email accounts',
      text: 'Here you can see the list of the existing email accounts. There is the only one email account created by default. You can also add a general contact email, a sales representative email, a customer support email and more to contact to your customers',
      attachTo: {
        element: '#email-accounts-area',
        on: 'bottom'
      },
      buttons: [nextButton]
    });


    //'Email accounts' step
    tour.addStep({
      title: 'Email accounts',
      text: 'Then, these email accounts will be used to send order notications, registration emails and newsletter to your customers. But you can use the only one email for all these purposes.',
      attachTo: {
        element: '#email-accounts-area',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    var defaultEmailAccountRowId = 'row_testmailcom';

    //'Email accounts' step
    tour.addStep({
      title: 'Email accounts',
      text: 'Don\'t forget to mark the reqiured email account as a default one',
      attachTo: {
        element: '#' + defaultEmailAccountRowId + ' .column-default .btn',
        on: 'bottom'
      },
      buttons: [backButton, nextButton]
    });

    //'Edit an email account' step
    tour.addStep({
      title: 'Edit an email account',
      text: 'To edit an email account click the <b>Edit</b> button',
      attachTo: {
        element: '#' + defaultEmailAccountRowId + ' .column-edit .btn',
        on: 'bottom'
      },
      buttons: [backButton, doneButton]
    });

    tour.start();
  });
})