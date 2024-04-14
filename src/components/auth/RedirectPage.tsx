import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const RedirectPage = () => {

  const location = useLocation();
  
  const getAccessTokenKakao = async (code: string) => {
    try {
      const response = await axios.get(`http://124.61.74.148:8080/api/v1/oauth/login/kakao?code=${code}`)
      console.log(response.data.data);
    } catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const code = queryParams.get('code')
    if (code) {
      getAccessTokenKakao(code)
    }
  })

  return (
    <div>잠시만 기다려주세요.</div>
  )
}

export default RedirectPage