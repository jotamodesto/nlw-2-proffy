import React, { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";

import warningIcon from "../../assets/images/icons/warning.svg";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import api from "../../services/api";

import reducer, {
  initialState,
  FieldName,
  ScheduleItemFields,
} from "./reducer";
import "./styles.css";

const TeacherForm = () => {
  const history = useHistory();

  const [
    { name, avatar, whatsapp, bio, subject, cost, scheduleItems },
    dispatch,
  ] = useReducer(reducer, initialState);

  function addNewScheduleItem() {
    dispatch({ type: "new-schedule-item" });
  }

  function handleSetValue(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    dispatch({
      type: "set-value",
      payload: {
        fieldName: event.target.name as FieldName,
        value: event.target.value,
      },
    });
  }

  function setScheduleItemValue(index: number) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      dispatch({
        type: "set-schedule-item",
        payload: {
          index,
          field: event.target.name as ScheduleItemFields,
          value: event.target.value,
        },
      });
  }

  function handleCreateClass(event: React.FormEvent) {
    event.preventDefault();

    api
      .post("classes", {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: parseFloat(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert("Cadastro realizado");
        history.push("/");
      })
      .catch(() => {
        alert("Erro no cadastro");
      });
  }

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formuário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name="name"
              label="Nome completo"
              value={name}
              onChange={handleSetValue}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={handleSetValue}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={handleSetValue}
            />
            <Textarea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={handleSetValue}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Ciências", label: "Ciências" },
                { value: "Educação física", label: "Educação física" },
                { value: "Geografia", label: "Geografia" },
                { value: "Matemática", label: "Matemática" },
                { value: "Português", label: "Português" },
                { value: "Química", label: "Química" },
              ]}
              onChange={handleSetValue}
            />
            <Input
              name="cost"
              label="Custo da sua hora por aula"
              value={cost}
              onChange={handleSetValue}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={setScheduleItemValue(index)}
                  options={[
                    { value: "0", label: "Domingo" },
                    { value: "1", label: "Segunda-feira" },
                    { value: "2", label: "Terça-feira" },
                    { value: "3", label: "Quarta-feira" },
                    { value: "4", label: "Quinta-feira" },
                    { value: "5", label: "Sexta-feira" },
                    { value: "6", label: "Sábado" },
                  ]}
                />
                <Input
                  name="from"
                  label="Das"
                  type="time"
                  value={scheduleItem.from}
                  onChange={setScheduleItemValue(index)}
                />
                <Input
                  name="to"
                  label="Até"
                  type="time"
                  value={scheduleItem.to}
                  onChange={setScheduleItemValue(index)}
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
