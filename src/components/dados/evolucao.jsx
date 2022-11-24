import ApexChart from "react-apexcharts";
import React, { useState, useEffect } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";
import { app } from "../api/app";

export function Evolucacao({ turma, aluno, media, nora }) {
  let count1 = 0; //8-10
  let count2 = 0; //6-8
  let count3 = 0; //4-6
  let count4 = 0; //2-4
  let count5 = 0; //0-2

  const handleVerificarNota = (nota) => {
    if (8 <= nota && nota <= 10) {
      count1++;
      console.log(count1);
    }
    if (nota >= 6 && nota < 8) {
      count2++;
    }
    if (nota >= 4 && nota < 6) {
      count3++;
    }
    if (nota >= 2 && nota < 4) {
      count4++;
    }
    if (nota >= 0) {
      count5++;
    }
    return null;
  };

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
            <p className="font-normal px-2 text-white text-[20px]">Turma</p>
            {idItemAluno > -1 &&
              dados[idItemSerie].series[idItemTurma].turmas.map(
                (item, index) =>
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
              dados[idItemSerie].series[idItemTurma].turmas[
                idItemAluno
              ].alunos.map((item, i) => (
                <p className="pr-4 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                  {item.name}
                </p>
              ))}
          </div>

          <div className="flex flex-col items-center">
            <p className="font-normal pl-4 pr-4 text-white text-[20px]">
              Média
            </p>

            {idItemAluno > -1 &&
              dados[idItemSerie].series[idItemTurma].turmas[
                idItemAluno
              ].alunos.map((item, i) => {
                handleVerificarNota(item.media_geral);
                if (item.media_geral > 0) {
                  return (
                    <p className="pr-4 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
                      {item.media_geral}
                    </p>
                  );
                }
                return (
                  <p className="pr-4 text-[18px] pl-4 bg-[#748FFC] text-white font-normal w-full flex justify-center items-center">
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
            // colors:['#7ebd0b', '#661818', "#333",'#7ebd0b', '#661818', "#333"],
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
  </div>;
}
