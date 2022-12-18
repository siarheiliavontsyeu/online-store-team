export const renderTemplate = (totalSum: number, totaAmount: number) => {
    return `      <header class="header">
    <a href="#" class="logo">
      <img src="" class="logo-image">
      <h1 class="name">Online store</h1>
    </a>
    <form action="" class="search-form">
      <input type="search" placeholder="Search here..." id="search-box">
      <label for="" class=""></label>
      <div class="search-btn"></div>
    </form>
    <div class="shopping-card">
      <div class="total-sum">$ ${totalSum}</div>
      <div class="total-amount">${totaAmount}</div>
      <div class="shopping-card-icon"></div>
    </div>
  </header>
    `
}