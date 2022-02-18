const initialState={
  cart:{},
  user:{}
}





export default function RootReducer(state=initialState,action){
const setCart=(cart)=>{
    localStorage.setItem('cart',JSON.stringify(cart))
  }


 switch(action.type)
 {
   case "ADD_USER":
        state.user[action.payload[0]]=action.payload[1]
        
        return {user:state.user,cart:state.cart}
   case "ADD_CART":
        state.cart[action.payload[0]]=action.payload[1]
        
        setCart(state.cart)
        return {cart:state.cart,user:state.user}
   case "REMOVE_CART":
         delete state.cart[action.payload[0]]
         localStorage.removeItem('cart')
         setCart(state.cart)

         return {cart:state.cart,user:state.user}    
   case 'REMOVE_ALL_CART':
              state.cart={}
              localStorage.removeItem('cart')
              return  {cart:state.cart,user:state.user}
    case 'SET_ALL_CART':
              state.cart=action.cartItems
              return  {cart:state.cart,user:state.user} 
   default:
         return state       
 }

}