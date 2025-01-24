import { useEffect, useRef } from "react";
import type { Route } from "./+types/spotify_callback";
import { useNavigate } from "react-router";
import { getAccessCode } from "~/util/SpotifyUtils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "callback" },
    { name: "description", content: "cd player" },
  ];
}

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;

export default function Spotify_Callback() {
  const navigate = useNavigate()  

  const qString = window.location.search;
  const urlSearch = new URLSearchParams(qString);
  const code = urlSearch.get("code");

  const hasRun = useRef(false)

  console.log(code)

  async function init() {
    if (code && !hasRun.current) {
      hasRun.current = true
      console.log("ran the init")

      const response = await getAccessCode(clientId, code)


      console.log(`access token ${response.access_token}`)

      localStorage.setItem("spotify_access_token", response.access_token)
      
      navigate("/player")
      hasRun.current = false
    }

  }

  useEffect(() => {
    init()
  }, [code])

  return (
      <div>
          <h1>IT WORKED</h1>
      </div>
  )
}
