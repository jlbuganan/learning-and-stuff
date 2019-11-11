var eventBus = new Vue();

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">
      <div class="product-image">
        <a :href="url"><img :src="image" :alt="description"></a>
      </div>

      <div class="product-info">
        <h1>{{ title }}</h1>
        <p v-if="inStock > 10">In Stock</p>
        <p v-else-if="inStock <= 10 && inStock > 0">Almost sold out!</p>
        <p v-else>Out of Stock</p>
        <p>Shipping: {{ shipping }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <div v-for="(variant, index) in variants"
          :key="variant.variantId"
          class="color-box"
          :style="{ 'background-color': variant.variantColor }"
          @mouseover="updateProduct(index)"
          >
        </div>

        <button @click="addToCart"
          :disabled="!inStock"
          :class="{ disabledButton: !inStock }">
          Add to Cart</button>

        <button @click="removeFromCart">
          Remove</button>

        <!-- <p v-show="inStock">Show and hide</p>
        <p v-if="inStock">Attach & Remove from DOM</p> -->
      </div>

      <product-tabs :reviews="reviews"></product-tabs>
    </div>
  `,
  data() {
    return {
      brand: "Gucci",
      product: "Socks",
      description: "Warm Wool SOCKSSS",
      url: "http://google.com",
      selectedVariant: 0,
      inventory: 5,
      details: ["80% cotton", "20% cotton", "GMO"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assets/socks-green.png",
          variantQuantity: 5
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assets/socks-blue.png",
          variantQuantity: 12
        }
      ],
      reviews: []
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
    }
  },
  computed: {
    // This value gets cached. More efficient than say, a method that gets run every time.
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      return this.premium ? "Free" : "$2.99";
    }
  },
  mounted() {
    // Kinda like angular's onInit?
    eventBus.$on("review-submitted", productReview => {
      this.reviews.push(productReview);
    });
  }
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div>
      <span
        :class="{ activeTab: selectedTab === tab }"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectedTab = tab">
        {{ tab }}
      </span>


      <div v-show="selectedTab === 'Reviews'">
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
            <p>{{ review.name }}</p>
            <p>Rating: {{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </li>
        </ul>
      </div>

      <product-review v-show="selectedTab === 'Write a Review'"></product-review>

    </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Write a Review"],
      selectedTab: "Reviews"
    };
  }
});

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">
      <p v-if="errors.length">
        <strong>Please correct the following errors:</strong>
        <ul>
          <li v-for="error in errors">{{ error }}</li>
        </ul>
      </p>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        eventBus.$emit("review-submitted", productReview);
        console.log("clear stuff now");
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
      }
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeFromCart(id) {
      var foundIndex = this.cart.findIndex(x => x == id);
      console.log(id, foundIndex);
      if (foundIndex >= 0) {
        this.cart.splice(foundIndex, 1);
      }
    }
  }
});
