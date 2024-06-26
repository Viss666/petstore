Vue.createApp({
  data() {
    return {
      currentPage: "pets",
      applications: [],
      allPets: [],
      name: "",
      species: "",
      breed: "",
      age: "",
      gender: "",
      filterPets: "",
    };
  },
  methods: {
    navigatePage: function (page) {
      this.currentPage = page;
      console.log("Changed to: ", this.currentPage);
    },
    // getListings(): makes a GET request to the server for all pet listings
    // createListing(): makes a POST request to the server from a "create listing" form
    // deleteListing(listingId): makes a DELETE request to the server based on the ID number of the pet being deleted
    // getApplications(): makes a GET request for all adoption applications
    // createApplication(): makes a POST request to the server from a "new adoption" application form
    getPets: function () {
      fetch("/pets").then((response) => {
        response.json().then((petsFromServer) => {
          console.log(petsFromServer);
          this.allPets = petsFromServer;
        });
      });
    },
    createPet: function () {
      var data = "";
      data += "name=" + encodeURIComponent(this.name);
      data += "&species=" + encodeURIComponent(this.species);
      data += "&breed=" + encodeURIComponent(this.breed);
      data += "&age=" + encodeURIComponent(this.age);
      data += "&gender=" + encodeURIComponent(this.gender);
      fetch("/pets", {
        body: data,
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }).then((response) => {
        this.getPets();
        this.navigatePage("pets");
        this.name = "";
        this.species = "";
        this.breed = "";
        this.age = "";
        this.gender = "";
      });
    },
    deletePet: function (id) {},
    getApps: function () {
      fetch("/applications").then((response) => {
        response.json().then((appsFromServer) => {
          console.log(appsFromServer);
          this.applications = appsFromServer;
        });
      });
    },
    adoptPet: function (id) {
      this.navigatePage("adopt");
    },
  },
  computed: function () {},
  created: function () {
    this.getPets();
  },
}).mount("#app");
