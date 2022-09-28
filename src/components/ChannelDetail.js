import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";
import { Videos, ChannelCard } from "./";
import { fetchfromAPI } from "../utils/fetchfromAPI";

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      const data = await fetchfromAPI(`channels?part=snippet&id=${id}`);

      setChannelDetail(data?.items[0]);

      const videosData = await fetchfromAPI(
        `search?channelId=${id}&part=snippet%2Cid&order=date`
      );

      setVideos(videosData?.items);
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight={"95vh"}>
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            xIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop={"-93px"} />
      </Box>
      <Box display={"flex"} p={2}>
        <Box sx={{ mr: { sm: "100px" } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
