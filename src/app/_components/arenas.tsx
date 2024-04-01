import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { IoPeopleSharp } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const Arenas = () => {
  const url =
    "https://tuwiazowna.pl/wp-content/uploads/2019/06/Boisko-Orlik-w-Zakr%C4%99cie_720.jpg";
  const id = "elo";
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="mt-20">
      {category && <p>You search all arenas in: {category}</p>}
      <div className="flex gap-2">
        <Button>
          <Link href={`/arena/${id}`}>To slug</Link>
        </Button>
        <Button>
          <Link href={`/arena/gbs`}>To gbs</Link>
        </Button>
        <Button>
          <Link href={`arena?category=Szczecinek`}>Szczecinek</Link>
        </Button>
        <Button>
          <Link href={`arena?category=Warszawa`}>Warszawa</Link>
        </Button>
        <Button>
          <Link href={`arena`}>Clear</Link>
        </Button>
      </div>
      <h1 className="text-2xl font-extrabold mb-2">Arenas</h1>
      <div className="flex gap-4">
        <Link href={"/arena"}>
          <Card className="cursor-pointer">
            <img src={url} className="w-80" />
            <CardHeader>
              <CardTitle className="pb-2 text-lg p-0">
                Poznań Jeżyce Orlik
              </CardTitle>
              <CardContent className="flex items-center gap-2 p-0">
                <FaRegMoneyBillAlt />
                <div>Free</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <CiLocationOn />
                <div>Poznań</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <IoPeopleSharp />
                <div>20</div>
              </CardContent>
            </CardHeader>
          </Card>
        </Link>
        {/*  */}
        <Link href={"/arena"}>
          <Card className="cursor-pointer">
            <img src={url} className="w-80" />
            <CardHeader>
              <CardTitle className="pb-2 text-lg p-0">
                Poznań Jeżyce Orlik
              </CardTitle>
              <CardContent className="flex items-center gap-2 p-0">
                <FaRegMoneyBillAlt />
                <div>Free</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <CiLocationOn />
                <div>Poznań</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <IoPeopleSharp />
                <div>20</div>
              </CardContent>
            </CardHeader>
          </Card>
        </Link>
        <Link href={"/arena"}>
          <Card className="cursor-pointer">
            <img src={url} className="w-80" />
            <CardHeader>
              <CardTitle className="pb-2 text-lg p-0">
                Poznań Jeżyce Orlik
              </CardTitle>
              <CardContent className="flex items-center gap-2 p-0">
                <FaRegMoneyBillAlt />
                <div>Free</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <CiLocationOn />
                <div>Poznań</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <IoPeopleSharp />
                <div>20</div>
              </CardContent>
            </CardHeader>
          </Card>
        </Link>
        <Link href={"/arena"}>
          <Card className="cursor-pointer">
            <img src={url} className="w-80" />
            <CardHeader>
              <CardTitle className="pb-2 text-lg p-0">
                Poznań Jeżyce Orlik
              </CardTitle>
              <CardContent className="flex items-center gap-2 p-0">
                <FaRegMoneyBillAlt />
                <div>Free</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <CiLocationOn />
                <div>Poznań</div>
              </CardContent>
              <CardContent className="flex items-center gap-1 p-0">
                <IoPeopleSharp />
                <div>20</div>
              </CardContent>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Arenas;
