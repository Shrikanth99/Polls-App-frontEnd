import { CategoriesContext } from '../App'
import {useContext, useEffect, useeffect,useState} from 'react'
import axios from '../config/axios'
import { useParams } from 'react-router-dom'
import React from 'react'
import PollsList from './PollsList'

const SingleCategory = () => {
    const {categoriesDispatch,categoriesState} = useContext(CategoriesContext)
    const {name} = useParams()

    useEffect(() => {
        (async() => {
            try {
                const response = await axios.get(`/api/polls/category/${name}`)
                categoriesDispatch({type:'SET_SELECTED_POLLS', payload : response.data })
            } catch (e) {
                console.log(e)   
            }
        })()
    },[])

    useEffect(() => {
        return () => {
            categoriesDispatch({type:'CLEAR_SELECTED_POLLS'})
        }
    },[])

  return (
    <div>
      <h2> Selected Category - {name} </h2>
      <h3> Total Polls - {categoriesState.selectedPolls.length} </h3>
      <PollsList polls={categoriesState.selectedPolls} />
    </div>
  )
}

export default SingleCategory


