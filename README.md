# KAIST CS473: FatOverflow
Seoyun Son (@anemoneflower, seoyun.son@kaist.ac.kr)  
Chaeeun Hwang (@navy3690, navy3690@kaist.ac.kr)  
Jaeyub Song (@jsong0327, jsong0327@kaist.ac.kr)   
Junyoung Choi (@Juny0ung, joonchoi518@kaist.ac.kr)  

## WebPage URL
(추가해야함)

## Project Summary
KAIST students in campus who gained weight during Covid-19 have difficulty in losing weight as it is hard to eat healthy food in campus. Our team tackled the problem by providing platform for group purchase of diet foods by allowing people to create or join posts gathering people interested in purchasing the same products. Our application is unique in that it shows ratings with diet-food specific metrics gathered from the crowd to help food selection and encourage more group purchases, and provides real-time button-based chatroom for efficient communication among people participating in the same group purchase.   

## Libraries and frameworks
### Vue.js (@vue/cli 4.4.4)
  * vue-chartjs  
  * vuex  
  * router  
  * vue-notification

### Firebase (8.4.2)
  * Realtime database
  * Storage

### Views & Components in ./src
__App.vue__: manage global components like NavBar, SearchBar, Sign In/Out buttions   
assets: png files for logo and icons   
components: Components that used for pages in View folder   
views: Components that used for pages   
- __Home.vue__   
- __MyPage.vue__   
- __SignIn.vue__   
- __GroupPurchaseList.vue__: Group purchase list page   
- __GroupPurchase.vue__: Group purchase post page   
- __MakeGroupPurchase.vue__: Make group purchase page   
- __Participate.vue__: Group purchase participate page   
- __Chat.vue__: Chat page   
- __ProductList.vue__: Product list page      
- __ViewReview.vue__: Review popup   

router/__index.js__: set routing   
store/__index.js__: global variables   


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
