import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { CommandMenu } from "@/components/ui/command-menu";
import TeamSwitcher from "@/components/ui/team-switcher";
import { UserNav } from "@/components/ui/user-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import Editor from "@/components/ui/editor";
import Tree from "@/components/ui/tree";
import { Folder, Notebook, NotebookPen, TestTube } from "lucide-react";

function BreadcrumbElement(props: React.ComponentProps<typeof BreadcrumbPage>) {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage {...props} />
      </BreadcrumbItem>
    </>
  );
}

export default function Page({
  params,
}: {
  params: { user: string; path: string[] };
}) {
  return (
    <>
      <CommandMenu />
      <div className="hidden h-screen flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <Breadcrumb className="mx-auto font-bold">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/user/${params.user}`}>
                    {params.user}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {params.path.map((p) => (
                  <BreadcrumbElement key={p}>{p}</BreadcrumbElement>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center space-x-4">
              <ThemeSwitcher />
              <UserNav />
            </div>
          </div>
        </div>
        <div className="m-3 h-0 flex-grow rounded-md border">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={25}>
              <ScrollArea className="h-full p-4">
                <Tree
                  notebook={[
                    {
                      title: "Test",
                      path: "JosephAbbey/MyNotes/Test",
                      icon: <TestTube />,
                    },
                    {
                      title: "Folder",
                      path: "JosephAbbey/MyNotes/Folder",
                      icon: <Folder />,

                      subnotes: [
                        {
                          title: "Subnote",
                          path: "JosephAbbey/MyNotes/Folder/Subnote",
                          icon: <Notebook />,
                        },
                        {
                          title: "Subnote 1",
                          path: "JosephAbbey/MyNotes/Folder/Subnote_1",
                          icon: <NotebookPen />,
                        },
                      ],
                    },
                  ]}
                />
              </ScrollArea>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={75}>
              <Editor path={`${params.user}/${params.path.join("/")}`} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  );
}
