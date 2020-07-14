App = {

  web3Provider: null,
  contracts: {},
  account: '0x0',

  init:  function () {
     
      return  App.initWeb3();
  },

  // initWeb3: function () 
  // {
  //     // // if (typeof web3 !== 'undefined') {
  //     //     App.web3Provider = web3.currentProvider;
  //     //     web3 = new Web3(web3.currentProvider);

  //     // }

  
  //         App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
  //         web3 = new Web3(App.web3Provider);


  //         console.log('hereeee');

      

  //     // console.log('hereeee');
  //     return App.initContract();

  // },

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
      $.getJSON("../test.json",
          function (demo) {
            // console.log('hereeeeppwdpwdp');
            // console.log(instance);

              App.contracts.Demo = TruffleContract(demo);


              App.contracts.Demo.setProvider(App.web3Provider);

              // console.log('sccc',App.contracts.Demo);



              return App.render();

          }
      );

  },

  render: function () {

      // web3.eth.getCoinbase(function(err, account) {
      //     if (err === null) {
      //         App.account = account;
      //         console.log('mmmmmmmmmmmmmmm');
      //         console.log(App.account);
      //     }
      // });

      // var DemoInstance;

      //   function (d) {
      //     console.log(d);
      //   }
      // ));
      console.log(web3.eth);

      // web3.eth.getAccounts().then(
      //   function (params) {
      //     console.log(params);
      //   }
      // )

      console.log('ppppppp',App.contracts.Demo);

      App.contracts.Demo.deployed().then(
          function (instance) {
            console.log('hoohohoh',instance);
              DemoInstance = instance;
             console.log(DemoInstance);
          }
      )

  },

  show: function () {
    App.contracts.Demo.deployed().then(
      function (instance) {
        showInstance = instance
        console.log(showInstance.show().then(
          function 
          (params) {
            console.log(params);
            $('.head').html(params)
          }
        ));
        

      }
    );
    },

    enter:function () {

      var name=$('.text').val()
      console.log(name);

      App.contracts.Demo.deployed().then(
        function (instance) {
          instance.setName(name,{from:'0xc5bE3826B79C5AfcC76ff79448cEA98282594747'})
        }
      )
    }


}

$(function () {
  $(window).load(function () {
      App.init();
  });
});
