export const getModalTemplate = () => {
  return `
      <div class="wrapper-modal">
      <div class="container">
        <div class="modal-content">
          <div class="modal-top modal-header">
            <h5 class="modal-title">Personal details</h5>
            <button id="btn-close-modal" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div class="modal-body">
            <div class="personal-details">
              <form class="modal-form" name="modal-form">
                <div class="personal-name form-item">
                  <input type="text" class="form-control" placeholder="Enter your name" required="">
                </div>
                <div class="personal-number form-item">
                  <input type="text" class="form-control" placeholder="Enter your phone number" required="">
                </div>
                <div class="adress form-item">
                  <input type="text" class="form-control" placeholder="Enter your delivery adress" required="">
                </div>
                <div class="email form-item">
                  <input type="text" class="form-control" placeholder="Enter your e-mail" required="">
                </div>
              </form>
            </div>
            <div class="card-details">
              <div class="credit-card-data">
                <div class="credit-card-number">
                  <input type="text" class="form-control" placeholder="Card number" required="">
                </div>
                <div class="credit-card-other-data">
                  <div class="valid-data">
                    <span>Valid:</span><input type="text" class="form-control" placeholder="Valid to" required="">
                  </div>
                  <div class="cvv-data">
                    <span>CVV:</span><input type="text" class="form-control" placeholder="CVV" required="">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-body"></div>
          <div class="modal-bottom modal-footer">
            <button id="btn-submit-buy" type="button" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
      `;
};
