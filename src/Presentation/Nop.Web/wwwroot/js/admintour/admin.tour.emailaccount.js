$(document).ready(function () {
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

  //'Email address' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsEmailAddressTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsEmailAddressText,
    attachTo: {
      element: '#email-area',
      on: 'bottom'
    },
    buttons: [nextButton]
  });

  //'Email display name' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsDisplayNameTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsDisplayNameText,
    attachTo: {
      element: '#display-name-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Host' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsHostTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsHostText,
    attachTo: {
      element: '#host-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Port' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsPortTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsPortText,
    attachTo: {
      element: '#port-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Username' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsUsernameTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsUsernameText,
    attachTo: {
      element: '#username-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Password' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsPasswordTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsPasswordText,
    attachTo: {
      element: '#password-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'SSL' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsUseSslTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsUseSslText,
    attachTo: {
      element: '#ssl-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Use default credentials' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsDefaultCredentialsTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsDefaultCredentialsText,
    attachTo: {
      element: '#default-area',
      on: 'bottom'
    },
    buttons: [backButton, nextButton]
  });

  //'Send test email' step
  tour.addStep({
    title: LocalResourcesProvider.localized_data.EmailAccountsTestEmailTitle,
    text: LocalResourcesProvider.localized_data.EmailAccountsTestEmailText,
    attachTo: {
      element: '#test-email-area',
      on: 'bottom'
    },
    buttons: [backButton, doneButton]
  });

  tour.start();
})