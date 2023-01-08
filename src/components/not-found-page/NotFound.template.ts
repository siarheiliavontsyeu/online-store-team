export const getTemplate = () => {
    return `
    <div class='container'>
        <div class='modal d-flex flex-wrap justify-content-center align-items-center'>
            <div class='not-found-text'>
                <h2 class='alert-heading'>SORRY!</h2>
                <p>The page you are looking for wasn't found</p>
                <a href="#main" class="btn btn-primary">GO TO HOMEPAGE</a>
            </div>
            <img class='not-found-image' src='../../assets/icons/404 Error with a broken robot-rafiki.svg' style="width:500px;">     
        </div>
    </div>`;
  };