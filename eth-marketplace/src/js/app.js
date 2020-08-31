App = {

  web3Provider: null,
  contracts: {},
  account: '0x0',

  init:  function () {
      return  App.initWeb3();
  },

  initWeb3:function(){

    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }

    web3 = new Web3(App.web3Provider);

    return App.initContract();
    
  },

  initContract: function() {
      $.getJSON("../Marketplace.json",
          function (marketplace) {
            // console.log('hereeeeppwdpwdp');
            // console.log(instance);

              App.contracts.Marketplace = TruffleContract(marketplace);
              App.contracts.Marketplace.setProvider(App.web3Provider);

              // console.log('sccc',App.contracts.Demo);
              return App.render();

          }
      );

  },

  render: function () {
      console.log(web3.eth);
      console.log('ppppppp',App.contracts.Marketplace);

      App.contracts.Marketplace.deployed().then(
          function (instance) {
            // console.log('hoohohoh',instance);
              MarketInstance = instance;
              
              // console.log(MarketInstance.bookMapping);
              // while(i < uniq)
              MarketInstance.bookMapping(3).then(
                function (results) {
                  console.log(results);
                }
              )
  

            //  console.log(MarketInstance);
          }
      )

  },


  sell:function () {

    var bookName=$('.book-name').val();
    var price=$('.price').val();

    MarketInstance.sell(bookName,price)

    var addEvent = MarketInstance.bookAdded();

    addEvent.watch(
      function (err,results) {
        if(!err){
          // $('#loader').hide();
          $('.Books').html(results.args.bookName);
          console.log(results);
        }
      }
    )

    // App.contracts.Marketplace.deployed().then(
    //   function (instance) {
    //     console.log(instance);
    //     instance.sell(bookName,price).then(
    //       function (data) {
    //         console.log(data);
    //       }
    //     )
    //   }
    // )

  },



  // show:function () {
  //   App.contracts.Marketplace.deployed().then(
  //     function (instance) {
  //       // console.log(instance);
  //       instance.bookMapping(2).then(
  //         function (book) {
  //           console.log(book);
  //         }
  //       )
            
  //     }
  //   )

  // }, 

  buy:function () {
  
    var uniqueId= $('.uniqueId').val();
    MarketInstance.buy(uniqueId);

    var buyEvent = MarketInstance.bookPurchased();

    buyEvent.watch(
      function (err,results) {
          if(!err){
            console.log(results);
          }
      }
    )
  
  }

  
}

// $( 
//   $(window).load(function () {
//     App.init();
// })
// )
$(function () {
  $(window).on('load',
      function () {
        App.init();
      }
    )
}
)


