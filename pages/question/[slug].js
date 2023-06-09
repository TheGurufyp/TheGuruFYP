import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Question from "../../components/Question";
import { Spinner, Text, Flex } from "@chakra-ui/react";

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [Allanswer, setAllanswer] = useState(null);
  const [isAnswerPost, setisAnswerPost] = useState(false);
  // console.log(slug);

  useEffect(() => {
    const cancelRequest = axios.CancelToken.source();
    if (slug) {
      // console.log(slug);
      const fetchAnswer = async () => {
        try {
          const responce = await axios
            .post(
              `${process.env.NEXT_PUBLIC_Host_URL}api/getAllAnswer`,
              {
                qid: slug,
              },
              {
                cancelToken: cancelRequest.token,
              }
            )
            .then(function (response) {
              console.log("data", response.data.payload);
              setAllanswer(response.data.payload);
              setisAnswerPost(false);
            });
        } catch (error) {
          if (axios.isCancel(err)) {
            console.log("cancel request");
          }

          console.log(error);
        }
      };

      fetchAnswer();

      return () => {
        cancelRequest.cancel();
      };
    }
  }, [isAnswerPost]);

  return (
    <>
      {Allanswer ? (
        <Question
          isPosted={setisAnswerPost}
          Allanswer={Allanswer}
          question_id={slug}
        />
      ) : (
        <>
          <Flex
            direction={"column"}
            width={"100%"}
            height="100vh"
            justify={"center"}
            align="center"
          >
            <Spinner size="xl" thickness="15px" />
            <Text>Loading</Text>
          </Flex>
        </>
      )}
    </>
  );
};

export default Slug;
