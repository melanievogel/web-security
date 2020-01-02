--
-- PostgreSQL database dump
--

-- Dumped from database version 10.9 (Ubuntu 10.9-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.9 (Ubuntu 10.9-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Drinks; Type: TABLE; Schema: public; Owner: mate
--

CREATE TABLE public."Drinks" (
    id bigint NOT NULL,
    drinkname text,
    vipcustomer bigint,
    volume integer DEFAULT 0
);


ALTER TABLE public."Drinks" OWNER TO mate;

--
-- Name: Users; Type: TABLE; Schema: public; Owner: mate
--

CREATE TABLE public."Users" (
    id bigint NOT NULL,
    username text,
    secret text
);


ALTER TABLE public."Users" OWNER TO mate;

--
-- Data for Name: Drinks; Type: TABLE DATA; Schema: public; Owner: mate
--

COPY public."Drinks" (id, drinkname, vipcustomer, volume) FROM stdin;
1	Mate	2	500
2	Cola Mate	2	500
3	Mate GOLD	3	1000
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: mate
--

COPY public."Users" (id, username, secret) FROM stdin;
1	admin	TWFubmJhZXJzY2h3ZWluCg==
2	iwannabethatguy	has nothing to hide
3	foo	bar
\.


--
-- Name: Drinks Drinks_pkey; Type: CONSTRAINT; Schema: public; Owner: mate
--

ALTER TABLE ONLY public."Drinks"
    ADD CONSTRAINT "Drinks_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: mate
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: fki_vipcustomer; Type: INDEX; Schema: public; Owner: mate
--

CREATE INDEX fki_vipcustomer ON public."Drinks" USING btree (vipcustomer);


--
-- Name: Drinks vipcustomer; Type: FK CONSTRAINT; Schema: public; Owner: mate
--

ALTER TABLE ONLY public."Drinks"
    ADD CONSTRAINT vipcustomer FOREIGN KEY (vipcustomer) REFERENCES public."Users"(id);


--
-- PostgreSQL database dump complete
--

