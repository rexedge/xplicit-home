import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface SignInProps {
  fullName?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `${process.env.VERCEL_URL}`
  : "/static";

const SignIn = ({ fullName = "" }: SignInProps) => {
  return (
    <Tailwind>
      <Html>
        <Head>
          <Preview>PalmTechnIQ User Registration Mail</Preview>
          <Body className="w-full">
            <Container className="w-full">
              <Section className="bg-[#021A1A]">
                <Img
                  className="mx-auto py-3 h-full object-cover"
                  src={`https://www.palmtechniq.com/assets/palmtechniqlogo.png`}
                  width="200"
                  height="200"
                />
              </Section>
              <Section className="w-full ">
                <Img
                  width="200"
                  className="mx-auto rounded-md md:object-cover object-contain w-full"
                  height="200"
                  src={`https://isce-mail.vercel.app/static/template-images/thanks.png`}
                />
              </Section>
              <Section>
                <Text className="font-bold text-[20px] ">
                  Your journey has started!!
                </Text>
                <Text>Dear {fullName},</Text>
                <Text>
                  We are glad to have you onboard, thank you for joining us on
                  this learning adventure. We are absolutely thrilled to have
                  you with us!
                </Text>
                <Text>
                  You are here because you are eager for knowledge and ready to
                  explore new horizons and you are ready to take charge of your
                  future and carve your path to success.
                </Text>
              </Section>
              <Section className=" md:text-left text-center">
                <Button
                  href="https://www.palmtechniq.com/courses"
                  className=" cursor-pointer rounded-full text-white text-[13px] bg-green-600 "
                  style={{ padding: "10px 20px", margin: "0 auto" }}
                >
                  View Courses
                </Button>
              </Section>
              <Section className="text-left">
                <span>
                  <Text>
                    Thanks, <br />
                    <b>PalmTechnIQ Team</b>
                  </Text>
                </span>
              </Section>
              <Hr className="mt-[30px]" />
              <Section className="text-center text-[#333333]">
                <Text>
                  <p>Copyright © 2024 PalmTechnIQ, All Rights Reserved.</p>
                  <p>
                    You are recieving this mail because you opted in via our
                    website.
                  </p>
                  <p>
                    Mailing Address: 1st Floor, (Festac Tower) Chicken Republic
                    Building, 22Rd ,Festac Town, Lagos, Nigeria.
                  </p>
                </Text>
              </Section>
              <Section className="pb-[40px] text-center ">
                <Button
                  href="https://www.facebook.com/profile.php?id=61561459226438&mibextid=ZbWKwL"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="PalmTechnIQ"
                    src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/facebook-app-round-white-icon.png`}
                  />
                </Button>
                <Button
                  href="https://www.linkedin.com/in/palm-techniq-03839b313/"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="PalmTechnIQ"
                    src={`https://static-00.iconduck.com/assets.00/linkedin-icon-512x512-a7sf08js.png`}
                  />
                </Button>
                <Button
                  href="https://www.instagram.com/palmtechniq/"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="PalmTechnIQ"
                    src={`https://static-00.iconduck.com/assets.00/instagram-icon-256x256-ubgz701g.png`}
                  />
                </Button>
                <Button
                  href="https://app.slack.com/client/T076LDT7109/C0764SE3VB7"
                  className="bg-green-600 m-[5px] py-[8px] px-[10px] rounded-full "
                >
                  <Img
                    width="23"
                    height="23"
                    alt="PalmTechnIQ"
                    src={`https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/slack-icon.png`}
                  />
                </Button>
              </Section>
            </Container>
          </Body>
        </Head>
      </Html>
    </Tailwind>
  );
};

export default SignIn;
