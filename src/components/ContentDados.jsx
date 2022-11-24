import ApexChart from "react-apexcharts";
import React, { useContext, useState, useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import { app } from "../api/app";
import { AuthContext } from "../context/auth";

function ContentDados() {
  const { user } = useContext(AuthContext);
  const [dados, setDados] = useState("");
  const [newDados, setNewDados] = useState([]);
  const [visivle, setVisivle] = useState("");
  // const [count, setCount] = useState(0);
  let count1 = 0; //8-10
  let count2 = 0; //6-8
  let count3 = 0; //4-6
  let count4 = 0; //2-4
  let count5 = 0; //0-2

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(
        "/dados/a8b56ba5-8dbb-4d51-ba74-e0c4f717081f"
      );

      setDados(response.data);
    };
    getData();
  }, []);

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
      //store the comparison values in array
      .map((e) => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])

      .map((e) => arr[e]);

    return unique;
  };

  // function componentDidMount() {
  //   const courses = require("./courses.json");
  //   this.setState({ courses: courses });
  // }

  const [idItemSerie, setIdItemSerie] = useState(-1);
  const [idItemTurma, setIdItemTurma] = useState(-1);
  const [idItemAluno, setIdItemAluno] = useState(-1);
  const [idItemNota, setIdItemNota] = useState(-1);
  const [idItemMedia, setIdItemMedia] = useState(-1);

  {
    // const handleCarregarDisc = function (e) {
    //   const opDisc = e.target.value;
    //   setIdItemSerie(opDisc);
    // };
    // const handleCarregarSerie = function (e) {
    //   const opSerie = e.target.value;
    //   setIdItemTurma(opSerie);
    // };
    // const handleCarregarTurma = function (e) {
    //   const opTurma = e.target.value;
    //   setIdItemAluno(opTurma);
    // };
    // const handleCarregarAluno = function (e) {
    //   const opAluno = e.target.value;
    //   setIdItemNota(opAluno);
    // };
    // const handleCarregarNota = function (e) {
    //   const opNota = e.target.value;
    //   setIdItemMedia(opNota);
    // };
    // const handleVerificarNota = (nota) => {
    //   if (8 <= nota && nota <= 10) {
    //     count1++;
    //   }
    //   if (nota >= 6 && nota < 8) {
    //     count2++;
    //   }
    //   if (nota >= 4 && nota < 6) {
    //     count3++;
    //   }
    //   if (nota >= 2 && nota < 4) {
    //     count4++;
    //   }
    //   if (nota >= 0) {
    //     count5++;
    //   }
    //   return null;
    // };
    // const optionsArea1 = {
    //   chart: {
    //     height: 350,
    //     type: "area",
    //   },
    //   dataLabels: {
    //     enabled: true,
    //   },
    //   stroke: {
    //     curve: "smooth",
    //   },
    //   xaxis: {
    //     categories: ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"],
    //   },
    // };
    // const seriesArea1 = [
    //   {
    //     name: "Notas",
    //     data: [
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre1,
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre2,
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre3,
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre4,
    //     ],
    //   },
    // ];
    // const optionsArea2 = {
    //   chart: {
    //     height: 350,
    //     type: "area",
    //   },
    //   dataLabels: {
    //     enabled: true,
    //   },
    //   stroke: {
    //     curve: "smooth",
    //   },
    //   xaxis: {
    //     categories: ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"],
    //   },
    // };
    // const seriesArea2 = [
    //   {
    //     name: "Notas",
    //     data: [
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre1,
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre2,
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre3,
    //       idItemNota > -1 &&
    //         dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
    //           idItemNota
    //         ].bimestre4,
    //     ],
    //   },
    // ];
    // const optionsArea3 = {
    //   chart: {
    //     height: 350,
    //     type: "area",
    //   },
    //   dataLabels: {
    //     enabled: true,
    //   },
    //   stroke: {
    //     curve: "smooth",
    //   },
    //   xaxis: {
    //     categories: ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"],
    //   },
    // };
    // const seriesArea3 = [
    //   {
    //     name: "Notas",
    //     data: [4, 3, 2, 1],
    //   },
    // ];
    // const optionsArea4 = {
    //   chart: {
    //     height: 350,
    //     type: "area",
    //   },
    //   dataLabels: {
    //     enabled: true,
    //   },
    //   stroke: {
    //     curve: "smooth",
    //   },
    //   xaxis: {
    //     categories: ["1º Bimestre", "2º Bimestre", "3º Bimestre", "4º Bimestre"],
    //   },
    // };
    // const seriesArea4 = [
    //   {
    //     name: "Notas",
    //     data: [1, 2, 3, 4],
    //   },
    // ];
  }

  return (
    <div className="flex flex-col ml-12 w-4/5">
      <div>
        <div className="w-full flex flex-col p-6 pt-4 bg-white rounded-lg shadow-md shaow-[#333]">
          <div className="w-full flex flex-row pt-2 grid grid-cols-5 gap-5 pb-1 ml-10">
            <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px] font-semibold">Disciplina</p>
              <select
                className="bg-[#FFFFFF] text-[16px]"
                // onClick={handleCarregarDisc}
                name="disciplina"
              >
                <option value={-1}> Selecione uma disciplina:</option>

                {Object.entries(newDados).map((item, i) => {
                  return (
                    <option key={"disciplina" + i} value={i}>
                      {item[1].disciplina}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px] font-semibold">Série</p>
              <select
                className="bg-[#FFFFFF] text-[16px]"
                // onClick={handleCarregarSerie}
                name="serie"
              >
                <option value={-1}> Selecione uma série:</option>
                {Object.entries(newDados).map((item, i) => {
                  // console.log(item[1].serie);
                  return (
                    <option key={"serie" + i} value={i}>
                      {item[1].serie}
                    </option>
                  );
                })}
              </select>
            </div> */}

            {/*
            <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px]">Turma</p>
              <select
                className="bg-[#FFFFFF] text-[16px]"
                onClick={handleCarregarTurma}
                name="turma"
              >
                <option value={-1}> Selecione uma turma:</option>
                {idItemTurma > -1 &&
                  dados[idItemSerie].disciplinas.series[idItemTurma].turmas.map(
                    (item, i) => {
                      return (
                        <option key={"turma" + i} value={i}>
                          {item.name}
                        </option>
                      );
                    }
                  )}
              </select>
            </div>

            <div className="flex flex-col text-[#4263EB]">
              <p className="text-[20px]">Aluno</p>
              <select
                className="bg-[#FFFFFF] text-[16px]"
                onClick={handleCarregarAluno}
                name="aluno"
              >
                <option value={-1}> Selecione um aluno:</option>

                {idItemAluno > -1 &&
                  dados[idItemSerie].disciplinas.series[idItemTurma].turmas[
                    idItemAluno
                  ].alunos.map((item, i) => {
                    return (
                      <option key={"aluno" + i} value={i}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div> */}
          </div>
        </div>

        <div className="w-full flex flex-col p-6 pt-6 bg-white rounded-lg shadow-md shaow-[#333] mt-4">
          <div className="flex flex-row justify-between pb-8 border-b border-[#4263EB] px-10 mt-10">
            <div className="">
              <p className="text-[#02C4B2] text-[45px] font-semibold ">
                UEB Primavera
              </p>
              <p className="text-[#748FFC] text-[25px] font-semibold mt-2">
                Física - 3 ano
              </p>
            </div>

            <div>
              <div className="flex flex-row items-center text-dark-purple hover:scale-110 duration-300">
                <PictureAsPdfIcon />
                <p className="text-[16px] font-normal">Exportar PDF</p>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-row justify-between mt-10 mb-12 px-16">
            <div className="flex flex-col w-1/3">
              <p className="text-[#02C4B2] text-[20px] font-bold">
                Tempo na plataforma
              </p>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">Tempo em aula:</p>
                <p className="text-[#748FFC] font-bold">90 min</p>
              </div>
              <div className="flex flex-row justify-between  text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">
                  Tempo em atividade:
                </p>
                <p className="text-[#748FFC] font-bold ">22 min</p>
              </div>
            </div>

            <div className="flex flex-col w-1/3 pl-4">
              <p className="text-[#02C4B2] text-[20px] font-bold">
                Participação
              </p>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">
                  Aulas assistidas:
                </p>
                <p className="text-[#748FFC] font-bold">25</p>
              </div>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">
                  Atividades realizadas:
                </p>
                <p className="text-[#748FFC] font-bold ">16</p>
              </div>
              <div className="flex flex-row justify-between text-[16px] pt-2 mr-16">
                <p className="text-[#748FFC] font-semibold">Materiais lidos:</p>
                <p className="text-[#748FFC] font-bold">12</p>
              </div>
            </div>

            <div className="flex flex-col w-1/3 items-center">
              <p className="text-[#02C4B2] text-[20px] font-bold">Média</p>

              {/* {idItemNota > -1 &&
              dados[idItemSerie].series[idItemTurma].turmas[idItemAluno].alunos[
                idItemNota
              ].media_geral > 0 ? (
                <div>
                  <p className="text-[#748FFC] mt-8 text-[75px] font-bold">
                    {
                      dados[idItemSerie].series[idItemTurma].turmas[idItemAluno]
                        .alunos[idItemNota].media_geral
                    }
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <p className="text-[#748FFC] mt-8 text-[20px] font-bold">
                    Sem nota cadastrada.
                  </p>
                </div>
              )} */}
            </div>
          </div>

          <div className="flex flex-col px-16 pb-12">
            <div className="flex flex-row justify-between">
              <p className="text-[#02C4B2] text-[20px] font-bold mr-4">
                Evolução
              </p>
              <div className="flex flex-row ">
                <a
                  className="flex flex-row items-center text-dark-purple mr-4 hover:scale-110 duration-300"
                  href="/"
                >
                  <DownloadIcon />
                  <p className="text-[16px] font-normal">Exportar XLS</p>
                </a>
                <a
                  className="flex flex-row items-center text-dark-purple hover:scale-110 duration-300"
                  href="/"
                >
                  <PictureAsPdfIcon />
                  <p className="text-[16px] font-normal">Exportar PDF</p>
                </a>
              </div>
            </div>

            <div className="flex flex-row mt-8 justify-between">
              <div className="flex flex-col ">
                <div className="flex flex-row items-center">
                  <input
                    name="theradio"
                    id="radio1"
                    type="radio"
                    // checked
                    className="h-4 w-4 cursor-pointer rounded-full"
                    value="1"
                    onClick={() => setVisivle("1")}
                    // className="h-4 w-4 cursor-pointer appearance-none rounded-full outline-none	border-solid border-2 border-indigo-500 relative flex items-center justify-center before:[content-none absolute h-4 w-4 bg-indigo rounded-lg opacity-0] checked:before:[opacity-1]"
                  />
                  <label for="radio1" className="cursor-pointer">
                    <span className="text-[18px] font-semibold text-dark-purple pl-4 hover:text-[#02C4B2] active:text-[#02C4B2]">
                      Médias
                    </span>
                  </label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    name="theradio"
                    id="radio2"
                    type="radio"
                    className="h-4 w-4 cursor-pointer"
                    value="2"
                    onClick={() => setVisivle("2")}
                  />
                  <label for="radio2" className="cursor-pointer">
                    <span className="text-[18px] font-semibold text-dark-purple pl-4 hover:text-[#02C4B2] active:text-[#02C4B2]">
                      Notas das atividades
                    </span>
                  </label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    name="theradio"
                    id="radio3"
                    type="radio"
                    className="h-4 w-4 cursor-pointer"
                    value="3"
                    onClick={() => setVisivle("3")}
                  />
                  <label for="radio3" className="cursor-pointer">
                    <span className="text-[18px] font-semibold text-dark-purple pl-4 hover:text-[#02C4B2] active:text-[#02C4B2]">
                      Quantidade de atividades
                    </span>
                  </label>
                </div>
                <div className="flex flex-row items-center">
                  <input
                    name="theradio"
                    id="radio4"
                    type="radio"
                    className="h-4 w-4 cursor-pointer"
                    value="4"
                    onClick={() => setVisivle("4")}
                  />
                  <label for="radio4" className="cursor-pointer">
                    <span className="text-[18px] font-semibold text-dark-purple pl-4 hover:text-[#02C4B2] active:text-[#02C4B2]">
                      Quantidades de aulas Assistidas
                    </span>
                  </label>
                </div>
              </div>
              {/* 
              {visivle == "1" && (
                <ApexChart
                  className=""
                  options={optionsArea1}
                  series={seriesArea1}
                  type="area"
                  height={300}
                  width={700}
                />
              )}

              {visivle == "2" && (
                <ApexChart
                  className=""
                  options={optionsArea2}
                  series={seriesArea2}
                  type="area"
                  height={300}
                  width={700}
                />
              )}
              {visivle == "3" && (
                <ApexChart
                  className=""
                  options={optionsArea3}
                  series={seriesArea3}
                  type="area"
                  height={300}
                  width={700}
                />
              )}
              {visivle == "4" && (
                <ApexChart
                  className=""
                  options={optionsArea4}
                  series={seriesArea4}
                  type="area"
                  height={300}
                  width={700}
                />
              )} */}
            </div>
          </div>

          <div className="flex flex-col px-16 pb-12">
            <div className="flex flex-row justify-between">
              <p className="text-[#02C4B2] text-[20px] font-bold mr-4">
                Média por intervalo
              </p>
              <div className="flex flex-row mr-4">
                <a
                  className="flex flex-row items-center text-dark-purple mr-4 hover:scale-110 duration-300"
                  href="/"
                >
                  <DownloadIcon />
                  <p className="text-[16px] font-normal">Exportar XLS</p>
                </a>
                <a
                  className="flex flex-row items-center text-dark-purple hover:scale-110 duration-300"
                  href="/"
                >
                  <PictureAsPdfIcon />
                  <p className="text-[16px] font-normal">Exportar PDF</p>
                </a>
              </div>
            </div>

            <div className="flex flex-row justify-between mt-8">
              <div className="flex flex-col">
                <div className="flex bg-dark-purple rounded-lg">
                  <div className="flex flex-col items-center border-r">
                    <p className="font-normal px-2 text-white text-[20px]">
                      Turma
                    </p>
                    {idItemAluno > -1 &&
                      dados[idItemSerie].disciplinas.series[
                        idItemTurma
                      ].turmas.map(
                        (item, index) =>
                          // {
                          //   for (
                          //     var t = 0;
                          //     t <
                          //     dados[idItemSerie].disciplinas.series[idItemTurma]
                          //       .turmas[idItemAluno].alunos.length;
                          //     t++
                          //   ) {
                          //     console.log(t);
                          //     idItemAluno == index && (
                          //       <div className="bg-[#748FFC] h-full flex items-center px-5">
                          //         {console.log(item.name)}
                          //         <p className=" text-[18px] text-white font-normal w-full ">
                          //           {item.name}
                          //         </p>
                          //       </div>
                          //     );
                          //   }
                          // }
                          idItemAluno == index && (
                            <div className="bg-[#748FFC] h-full flex items-center px-5">
                              <p className=" text-[18px] text-white font-normal w-full ">
                                {item.name}
                              </p>
                            </div>
                          )
                      )}
                  </div>

                  <div className="flex flex-col border-r items-center">
                    <p className="font-normal pl-4 pr-4 text-white text-[20px]">
                      Aluno
                    </p>
                    {idItemAluno > -1 &&
                      dados[idItemSerie].disciplinas.series[idItemTurma].turmas[
                        idItemAluno
                      ].alunos.map((item, i) => {
                        return (
                          <p
                            className={`pr-4 text-[18px] pl-4 ${
                              i % 2 != 0
                                ? `bg-[#748FFC] text-white`
                                : `bg-[#EDF2FF] text-dark-purple`
                            } font-normal w-full flex justify-center items-center`}
                          >
                            {item.name}
                          </p>
                        );
                      })}
                  </div>

                  <div className="flex flex-col items-center">
                    <p className="font-normal pl-4 pr-4 text-white text-[20px]">
                      Média
                    </p>

                    {idItemAluno > -1 &&
                      dados[idItemSerie].disciplinas.series[idItemTurma].turmas[
                        idItemAluno
                      ].alunos.map((item, i) => {
                        // handleVerificarNota(item.media_geral);
                        if (item.media_geral > 0) {
                          return (
                            <p
                              className={`pr-4 text-[18px] pl-4 ${
                                i % 2 != 0
                                  ? `bg-[#748FFC] text-white`
                                  : `bg-[#EDF2FF] text-dark-purple`
                              } font-normal w-full flex justify-center items-center`}
                            >
                              {item.media_geral}
                            </p>
                          );
                        }
                        return (
                          <p
                            className={`pr-4 text-[18px] pl-4 ${
                              i % 2 != 0
                                ? `bg-[#748FFC] text-white`
                                : `bg-[#EDF2FF] text-dark-purple`
                            } font-normal w-full flex justify-center items-center`}
                          >
                            Sem nota cadastrada.
                          </p>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <ApexChart
                  className="flex items-center justify-center"
                  series={[count5, count3, count3, count2, count1]}
                  options={{
                    labels: ["0-2", "2-4", "4-6", "6-8", "8-10"],
                    colors: [
                      "#4263EB",
                      "#661818",
                      "#808080",
                      "#7ebd0b",
                      "#02C4B2",
                    ],
                    plotOptions: {
                      pie: {
                        donut: {
                          labels: {
                            show: true,
                            fontsize: 30,
                            color: "#000000",
                          },
                        },
                      },
                    },

                    dataLabels: {
                      enabled: false,
                    },
                  }}
                  type="donut"
                  height={280}
                  width={300}
                />

                <div className="grid grid-cols-2 gap-12 text-dark-purple font-semibold text-[18px]">
                  <div className="flex flex-col justify-between items-center">
                    <p>Média</p>
                    <span>8-10</span>
                    <span>6-8</span>
                    <span>4-6</span>
                    <span>2-4</span>
                    <span>0-2</span>
                  </div>
                  <div className="flex flex-col justify-between items-center">
                    <p>Alunos</p>
                    <span>{count1}</span>
                    <span>{count2}</span>
                    <span>{count3}</span>
                    <span>{count4}</span>
                    <span>{count5}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentDados;
