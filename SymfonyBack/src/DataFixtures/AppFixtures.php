<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use App\Entity\Todo;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);

        for ($i = 0; $i < 10; $i++) {
            $t = new Todo();
            $t->setTitle("todo numero ".$i);
            $t->setText("Este es el texto del todo numero ".$i);
            $manager->persist($t);
        }

        $manager->flush();
    }
}
