:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_log)).
:- use_module(library(http/html_write)).
:- use_module(library(http/http_server)).

% Configura las opciones de CORS para permitir solicitudes desde http://localhost:3000
:- set_setting_default(http:cors, [methods([get, post, options]),
                                   origin('http://localhost:3000'),
                                   headers([authorization, 'Content-Type', 'X-Requested-With'])]).

% Inicia el servidor en un puerto específico
server(Port) :-
    http_server(http_dispatch, [port(Port)]).

%%%%%%%%%%%%%%%%%%%%%%%%%% BUSINESS LOGIC %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Define el manejador para recibir la salida
handle_test_output(_Request) :-
    format('Content-type: application/json\r\n'),
    format('Access-Control-Allow-Origin: *\r\n'), % Permitir cualquier origen (puedes ajustarlo según tus necesidades)
    format('Access-Control-Allow-Methods: GET, POST, OPTIONS\r\n'),
    format('Access-Control-Allow-Headers: Content-Type\r\n\r\n'),
    format('{ "message": "Hola, esta es una respuesta estática" }').


%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% MAIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% Inicialización
:- initialization
    (current_prolog_flag(argv, [SPort | _]) -> true ; SPort='8000'),
    atom_number(SPort, Port),
    set_setting_default(http:cors, [*]), % Allows cors for every
    server(Port).
