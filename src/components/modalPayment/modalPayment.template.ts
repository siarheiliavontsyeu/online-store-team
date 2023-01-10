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
      
        <form class="modal-form" name="modal-form">
         <div class="modal-body">
          <div class="personal-details">
            <div class="personal-name form-item">
              <input id="input-modal-name" type="text" class="form-control" placeholder="Enter your name" required>
              <div class="invalid-feedback">Error! Name is incorrect</div>
            </div>
            <div class="personal-number form-item">
              <input id="input-modal-number" type="tel" class="form-control" placeholder="Enter your phone number" required>
              <div class="invalid-feedback">Error! Phone number is incorrect</div>
            </div>
            <div class="adress form-item">
              <input id="input-modal-adress" type="text" class="form-control" placeholder="Enter your delivery adress" required>
              <div class="invalid-feedback">Error! Adress is incorrect</div>
            </div>
            <div class="email form-item">
              <input id="input-modal-email" type="email" class="form-control" placeholder="Enter your e-mail" required>
              <div class="invalid-feedback">Error! E-mail is incorrect</div>
            </div>
          </div>
          <div class="card-details">
            <div class="credit-card-data">
              <div class="credit-card-number">
                <input id="input-card-number" type="text" class="form-control" placeholder="Card number" required>
                <div class="invalid-feedback">Error! Card number is incorrect</div>
              </div>
              <div class="credit-card-other-data">
                <div class="valid-data">
                  <label>Valid:<input id="input-card-valid" type="text" class="form-control" placeholder="XX/XX" required></label>
                  <div class="invalid-feedback">Error!</div>
                </div>
                <div class="cvv-data">
                  <label>CVV:<input id="input-card-cvv" type="password" class="form-control" placeholder="XXX" required></label>
                  <div class="invalid-feedback">Error!</div>
                </div>
              </div>
            </div>
          </div>
          </div>
          <div class="alert alert-success hidden">
            <strong>Well done! Order is processed!</strong>
          </div>
          <button id="btn-submit-buy" type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  </div>
</div>
</div>
      `;
};
