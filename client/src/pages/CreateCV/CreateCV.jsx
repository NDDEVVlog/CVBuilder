import React, { useState } from 'react'
import './CreateCV.css'
import { useParams } from 'react-router-dom';

const CreateCV = () => {

    const [user, setUser] = useState()
    const {id} = useParams()
  const {
    name = "Michelle Wattz",
    objective = "This is the place for a brief summary of your key responsibilities and accomplishments.",
    skills = ["Professional Communication", "Leadership", "Time Management"],
    experience = [
      {
        company: "Hyperwarp Coffee",
        location: "Atlanta, GA",
        date: "11.XX – Present",
        description: "This is the place for a brief summary of your key responsibilities and accomplishments."
      },
      {
        company: "Hyperwarp Coffee",
        location: "Atlanta, GA",
        date: "6.XX – 4.XX",
        description: "This is the place for a brief summary of your key responsibilities and accomplishments."
      }
    ],
    education = [
      {
        school: "Glennwood University",
        location: "Detroit, MI",
        year: "20XX",
        degree: "Business Communication Degree",
        details: "You might want to include your GPA here and a brief summary of relevant coursework, awards, and honors."
      }
    ],
  } = data ;

  return (
    <div className="CreateCVContainer">
      {/* Name Section */}
      <div className="myName">{name}</div>

      {/* Objective Section */}
      <section>
        <h2>Objective</h2>
        <p>{objective}</p>
      </section>

      {/* Skills Section */}
      <section>
        <h2>Skills and Abilities</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Experience Section */}
      <section>
        <h2>Experience</h2>
        {experience.map((job, index) => (
          <div key={index}>
            <h3>{job.company}</h3>
            <p>{job.location} | {job.date}</p>
            <p>{job.description}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section>
        <h2>Education</h2>
        {education.map((edu, index) => (
          <div key={index}>
            <h3>{edu.school}</h3>
            <p>{edu.location} | {edu.year}</p>
            <p>{edu.degree}</p>
            <p>{edu.details}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CreateCV;
