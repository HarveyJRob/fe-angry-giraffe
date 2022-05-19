// Components
import ScrollButton from "../components/ScrollButton";

function About() {
  return (
    <main>
      <ScrollButton />
      <div className="articleContainer">
        <article>
          <p>
            Hi, my name's Rob and I'm a Trainee full-stack software developer based in Leeds. I’m comfortable working
            with both frontend and backend technologies and place value on clean, understandable, and test-driven code.
            My goal is to find a role within a knowledgeable and supportive team where I can add value whilst continuing
            to learn.
          </p>
          <ul>
            <li>
              <i className="fa-brands fa-linkedin"></i> https://www.linkedin.com/in/rob-harvey-66740b39/
            </li>
            <li>
              <i className="fa-brands fa-github"></i> https://github.com/HarveyJRob
            </li>
          </ul>
        </article>
      </div>
    </main>
  );
}

export default About;
