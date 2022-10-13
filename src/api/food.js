import axios from "axios"

export default axios.create({
  baseURL: "https://fake-food-server.herokuapp.com"
})