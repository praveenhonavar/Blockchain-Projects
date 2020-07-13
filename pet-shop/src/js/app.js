App = {

  web3Provider: null,
  contracts: {},
  account: '0x0',

  init:  function () {
      // setInterval(
      //     () => {
      //         $('.text').html('Loding')
      //     },
      //     2000
      // );
      return  App.initWeb3();
  },

  initWeb3: function () 
  {
      if (typeof web3 !== 'undefined') {
          App.web3Provider = web3.currentProvider;
          web3 = new Web3(web3.currentProvider);

      }

      else {
          App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
          web3 = new Web3(App.web3Provider);

      }

      console.log('hereeee');
      return App.initContract();

  },

  initContract: function() {
      $.getJSON("../test.json",
          function (demo) {
            console.log('hereeeeppwdpwdp');
            // console.log(instance);

              App.contracts.Demo = TruffleContract(demo);


              App.contracts.Demo.setProvider(App.web3Provider);

              // console.log('sccc',App.contracts.Demo);



              return App.render();

          }
      );

  },

  render: function () {

      web3.eth.getCoinbase(function(err, account) {
          if (err === null) {
              App.account = account;
          }
      });

      // var DemoInstance;

      //   function (d) {
      //     console.log(d);
      //   }
      // ));

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
    }
};

$(function () {
  $(window).load(function () {
      App.init();
  });
});