<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

use App\Entity\User;
use App\Repository\UserRepository;
use Firebase\JWT\JWT;



class AuthController extends AbstractController
{
    


    /**
     * @Route("/auth/login", name="login", methods={"POST"})
     */
    public function login(Request $request, UserRepository $userRepository, UserPasswordEncoderInterface $encoder)
    {
            $user = $userRepository->findOneBy([
                    'username'=>$request->get('username'),
            ]);
            if (!$user || !$encoder->isPasswordValid($user, $request->get('password'))) {
                    return $this->json([
                        'message' => 'username or password is wrong.',
                    ]);
            }
        $payload = [
            "user" => $user->getUsername(),
            "exp"  => (new \DateTime())->modify("+60 minutes")->getTimestamp(),
        ];


            $jwt = JWT::encode($payload, $this->getParameter('jwt_secret'), 'HS256');
            return $this->json([
                'message' => 'success!',
                'token' => sprintf('Bearer %s', $jwt),
            ]);
    }



    /**
     * @Route("/auth/register", name="register", methods={"POST"})
     */
    public function register(Request $request, UserPasswordEncoderInterface $encoder)
    {
        $password = $request->get('password');
        $username = $request->get('username');
        $user = new User();
        $user->setPassword($encoder->encodePassword($user, $password));
        $user->setUsername($username);
        $em = $this->getDoctrine()->getManager();
        $em->persist($user);
        $em->flush();
        return $this->json([
            'user' => $user->getUsername()
        ]);
    }

    
}
