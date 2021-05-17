<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

use App\Entity\Todo;
use App\Repository\TodoRepository;

class TodoController extends AbstractController
{

    private $todoRepository;

    public function __construct(TodoRepository $todoR){
        $this->todoRepository = $todoR;
    }

    /**
     * @Route("api/todo", name="todo")
     */
    public function index(): Response
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/TodoController.php',
        ]);
    }

    /**
     * @Route("api/todos", name="get_all_todo")
     */
    public function getAll(): JsonResponse
    {
        //$todos = $this->todoRepository->findAll();
        $data = [];

        $user = $this->getUser();
        $todos = $user->getTodos();

        foreach ($todos as $t) {
            $data[] = [
                'id' => $t->getId(),
                'title' => $t->getTitle(),
                'text' => $t->getText(),
                'completed' => $t->getCompleted()
            ];
        }

        return new JsonResponse($data, Response::HTTP_OK);
    }

    /**
     * @Route("api/todo/save", name="save_todo")
     */
    public function saveTodo(Request $request): JsonResponse
    {        

        $user = $this->getUser();
        
        $data = json_decode($request->getContent(),true);

        $title = $data['title'];
        $text = $data['text'];
        $completed = $data['completed'];

        $todo = $this->todoRepository->find($data['id']);
        if (!$todo)
            $todo = new Todo();
        

        $todo->setTitle($title);
        $todo->setText($text);
        $todo->setUser($user);
        $todo->setCompleted($completed);

        $em = $this->getDoctrine()->getManager();
        $em->persist($todo);
        $em->flush();

        $response = ['id'=> $todo->getId(),'title' => $title, 'text' => $text];
        

        return new JsonResponse($response, Response::HTTP_OK);
    }

    /**
     * @Route("api/todo/delete", name="delete_todo")
     */
    public function deleteTodo(Request $request): JsonResponse
    {     
 
        $data = json_decode($request->getContent(),true);

        
        $id = $data['id'];

        $todo = $this->todoRepository->find($id );
       
        $em = $this->getDoctrine()->getManager();
        $em->remove($todo);
        $em->flush();

        $response = ['id'=> $id ,'title' => 'borrada', 'text' => 'borrada'];
        

        return new JsonResponse($response, Response::HTTP_OK);
    }


}
