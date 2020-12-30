$(document).ready(function () {
  $('#paymentmethods-grid').on('draw.dt', function () {
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

    var checkMoneyMethodRowId = 'row_paymentscheckmoneyorder';
    var manualMethodRowId = 'row_paymentsmanual';
    var paypalButtonsMethodRowId = 'row_paymentspaypalsmartpaymentbuttons';

    var checkMoneyMethodExists = $('#' + checkMoneyMethodRowId).length;
    var manualMethodExists = $('#' + manualMethodRowId).length;
    var paypalButtonsMethodExists = $('#' + paypalButtonsMethodRowId).length;

    //'Payment methods' step
    var paymentMethodsStepButtons = [];
    if (!checkMoneyMethodExists && !manualMethodExists && paypalButtonsMethodExists) {
      paymentMethodsStepButtons = [doneButton]
    } else {
      paymentMethodsStepButtons = [nextButton]
    }

    tour.addStep({
      title: LocalResourcesProvider.localized_data.PaymentMethodsPaymentMethodsTitle,
      text: LocalResourcesProvider.localized_data.PaymentMethodsPaymentMethodsText,
      attachTo: {
        element: '#payment-methods-area',
        on: 'bottom'
      },
      buttons: paymentMethodsStepButtons
    });

    //'Check/Money Order' step
    if (checkMoneyMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.PaymentMethodsCheckMoneyTitle,
        text: LocalResourcesProvider.localized_data.PaymentMethodsCheckMoneyText,
        attachTo: {
          element: '#' + checkMoneyMethodRowId,
          on: 'bottom'
        },
        buttons: [backButton, nextButton]
      });
    }

    //'Manual' step
    if (manualMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.PaymentMethodsManualTitle,
        text: LocalResourcesProvider.localized_data.PaymentMethodsManualText,
        attachTo: {
          element: '#' + manualMethodRowId,
          on: 'bottom'
        },
        buttons: [backButton, nextButton]
      });
    }

    //'PayPal Smart Payment Buttons' step
    if (paypalButtonsMethodExists) {
      tour.addStep({
        title: LocalResourcesProvider.localized_data.PaymentMethodsPaymentMethodsTitle,
        text: LocalResourcesProvider.localized_data.PaymentMethodsPaymentMethodsText,
        attachTo: {
          element: '#' + paypalButtonsMethodRowId,
          on: 'bottom'
        },
        buttons: [backButton, nextButton]
      });
    }

    //'Configure a payment method' step
    tour.addStep({
      title: LocalResourcesProvider.localized_data.PaymentMethodsPayPalTitle,
      text: LocalResourcesProvider.localized_data.PaymentMethodsPayPalText,
      attachTo: {
        element: '#' + paypalButtonsMethodRowId + ' .column-configure .btn-default',
        on: 'bottom'
      },
      buttons: [backButton, doneButton]
    });

    tour.start();
  });
})