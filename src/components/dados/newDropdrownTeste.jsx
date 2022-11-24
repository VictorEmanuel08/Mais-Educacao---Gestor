import countries from "./countries.json";
import courses from "./courses.json";
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { app } from "../../api/app";

export function DropDownTeste() {
  const [newDados, setNewDados] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/dadosBI/atividades/${user}`);

      setNewDados(response.data);
    };
    getData();
  }, []);

  console.log(newDados);

  const [countries, setCountries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState([]);

  function handleSubmit(event) {
    alert("Your favorite flavor is: " + event);
  }

  function handleSubmitCourse(event) {
    alert("Your selected value is: " + event);
  }

  function handleChange(event) {
    setCourses({ value: event.target.value });
  }

  function handleChangeCourse(event) {
    setCourse({ course: event.target.value });
  }

  const getUnique = (arr, comp) => {
    const unique = arr
      .map((e) => e[comp])

      .map((e, i, final) => final.indexOf(e) === i && i)

      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  };

  function componentDidMount() {
    const courses = newDados;
    setCourses({ courses: courses });
  }

  console.log(course);

  const uniqueCountry = getUnique(countries.world, "country");

  const uniqueCouse = getUnique(courses, "tag");

  //   const courses = state.courses;
  //   const course = state.course;

  const filterDropdown = courses.filter(function (result) {
    return result.tag === course;
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select onChange={handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
        <br />
        <br />
        <label>
          Looping through Array
          <select>
            {countries.map((item) => (
              <option key={item.id} value={item.country}>
                {item.country}
              </option>
            ))}
            {console.log(countries)}
          </select>
        </label>
        <br />
        <br />
        <label>
          Looping through Json File
          <select>
            {uniqueCountry.map((item) => (
              <option key={item.id} value={item.country}>
                {item.country}
              </option>
            ))}
            {console.log(countries)}
          </select>
        </label>
      </form>

      <form onSubmit={handleSubmitCourse}>
        <br />
        <br />
        <label>
          Looping through Courses tag from Json File
          <select value={course} onChange={handleChangeCourse}>
            {uniqueCouse.map((course) => (
              <option key={course.id} value={course.tag}>
                {course.tag}
              </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
        <div>
          {filterDropdown.map((course) => (
            <div key={course.id} style={{ margin: "10px" }}>
              {course.course}
              <br />
            </div>
          ))}
        </div>
      </form>
    </div>
  );
}
